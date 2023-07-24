import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../utils/prismaClient';
import * as bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const data: any = await req.json();

    const { name, email, password } = data;

    const newUser: any = await prisma.user.create({
      data: { ...data, passwordHash: await bcrypt.hash(password, 10) }
    });

    delete newUser.passwordHash;

    return NextResponse.json({ data: newUser, status: 200, success: true });
  } catch (err) {
    console.error(err);
  }
}
