import { decode } from 'next-auth/jwt';
import { prisma } from '../../utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';

export async function PUT(req: NextRequest) {
  try {
    const { passwordHash } = await req.json();
    const token = req.cookies.get('next-auth.session-token')?.value || '';
    const decoded = await decode({ token, secret: process.env.SECRET || '' });

    const currentUserId = decoded && Number(decoded.sub);

    if (decoded) {
      const user = await prisma.user.findUnique({
        where: { id: currentUserId || undefined }
      });

      const newPasswordHash = await bcrypt.hash(passwordHash, 10);

      try {
        const isPasswordSame = await bcrypt.compare(
          passwordHash,
          user?.passwordHash || ''
        );

        if (isPasswordSame) {
          throw Error("New Password can't be the same with old one");
        } else {
          await prisma.user.update({
            where: { id: currentUserId || undefined },
            data: {
              passwordHash: newPasswordHash
            }
          });

          return NextResponse.json({ status: 200 });
        }
      } catch (err) {
        console.error(err);
        return NextResponse.json({ status: 500 });
      }
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ messages: err }, { status: 500 });
  }
}
