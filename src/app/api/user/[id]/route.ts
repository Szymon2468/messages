import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../utils/prismaClient';

export async function POST(req: NextRequest) {
  try {
    const { userId, name, email } = await req.json();

    const newUser = await prisma.user.update({
      where: { id: userId },
      data: { email, name }
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId, name, email } = await req.json();

    await prisma.user.delete({ where: { id: userId } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}
