import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../utils/prismaClient';
import * as bcrypt from 'bcrypt';

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const token = params.token;
  const { newPassword } = await req.json();

  try {
    const verificationToken: any = await prisma.verificationToken.findFirst({
      where: { token },
      select: { userId: true }
    });

    if (newPassword != undefined) {
      const passwordHash = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: verificationToken?.userId },
        data: { passwordHash }
      });
      console.log('haslo zmienione na', newPassword);
    } else {
      console.log('no cos nie dziala');
    }

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
