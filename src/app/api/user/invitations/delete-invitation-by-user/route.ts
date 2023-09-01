import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../utils/prismaClient';
import { decode } from 'next-auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('next-auth.session-token')?.value || '';
    const decoded = await decode({ token, secret: process.env.SECRET || '' });

    const userId = decoded && Number(decoded.sub);

    const { receiverId } = await req.json();

    if (decoded && userId && receiverId) {
      await prisma.userRelationship.delete({
        where: {
          userFirstId_userSecondId: {
            userFirstId: userId,
            userSecondId: receiverId
          }
        }
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}
