import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../utils/prismaClient';
import * as bcrypt from 'bcrypt';
import { newUserSchema } from '@/yup/newUserSchema';
import { Prisma } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const data: any = await req.json();
    const { name, email, passwordHash } = data;

    await newUserSchema.validate(data);

    const ifUserExists = await prisma.user.findFirst({
      where: { email },
      select: { email: true }
    });

    if (!ifUserExists) {
      const hashedPassword =
        passwordHash && (await bcrypt.hash(passwordHash, 10));
      console.log('password', passwordHash);

      const newUser: any = await prisma.user.create({
        data: { ...data, passwordHash: hashedPassword }
      });

      console.log(newUser);

      delete newUser.passwordHash;

      return NextResponse.json({ data: newUser, status: 200, success: true });
    } else {
      throw Error('Email already exists');
    }
  } catch (err: Prisma.PrismaClientKnownRequestError | any) {
    console.log(err);

    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
