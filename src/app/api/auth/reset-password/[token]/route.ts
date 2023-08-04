import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../utils/prismaClient';
import * as bcrypt from 'bcrypt';

export async function PUT(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const token = params.token;
  const { newPasswordHash } = await req.json();

  try {
    const verificationToken: any = await prisma.verificationToken.findFirst({
      where: { token: token },
      select: { userId: true }
    });

    await prisma.user.update({
      where: { id: verificationToken?.userId },
      data: { passwordHash: await bcrypt.hash(newPasswordHash, 10) }
    });

    await prisma.verificationToken.deleteMany({
      where: { expiresAt: { lt: new Date() } }
    });
    await prisma.verificationToken.deleteMany({ where: { token: token } });
    return NextResponse.json({ status: 200 });
  } catch (meow) {
    console.error(meow);
    throw new Error('cos sie zespsulo');
  }
}
