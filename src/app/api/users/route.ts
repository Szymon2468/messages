import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../utils/prismaClient';

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: { email: true, name: true }
    });
    if (!users) throw new Error('No Users Found');
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err }, { status: 400 });
  }
}
