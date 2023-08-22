import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../utils/prismaClient';
import { decode } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('next-auth.session-token')?.value || '';
    const decoded = await decode({ token, secret: process.env.SECRET || '' });

    const userId = decoded && Number(decoded.sub);

    if (userId) {
      const users = await prisma.user.findMany({
        where: { NOT: { id: userId } },
        select: { email: true, name: true },
        orderBy: { name: 'asc' }
      });
      if (!users) throw new Error('No Users Found');

      return NextResponse.json(users, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err }, { status: 400 });
  }
}
