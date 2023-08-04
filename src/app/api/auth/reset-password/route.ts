import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../utils/prismaClient';
import jwt from 'jsonwebtoken';
import { sendMail } from '../../utils/sendMail';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      throw new Error('cos jest nie tak z mailem');
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true, id: true }
    });

    if (!user) {
      throw new Error('nie ma takiego uzytkownika');
    }

    const token: string = jwt.sign({ id: user.id }, process.env.SECRET || '');

    await prisma.verificationToken.create({
      data: {
        expiresAt: new Date(new Date().getTime() + 15 * 6000),
        token: token,
        userId: user.id
      }
    });

    const link: string = `http://localhost:3000/reset-password/${token}`;
    await sendMail(email, link);

    return NextResponse.json(link, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}
