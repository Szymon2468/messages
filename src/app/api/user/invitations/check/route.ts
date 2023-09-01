import { prisma } from '../../../utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';
import { decode } from 'next-auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('next-auth.session-token')?.value || '';
    const decoded = await decode({ token, secret: process.env.SECRET || '' });

    const userId = decoded && Number(decoded.sub);

    const { receiverId } = await req.json();

    if (userId) {
      const relation = await prisma.userRelationship.findFirst({
        where: { userFirstId: userId, userSecondId: receiverId }
      });

      if (
        relation?.relationStatus === 'FRIENDS' ||
        relation?.relationStatus === 'PENDING_FIRST_SECOND' ||
        relation?.relationStatus === 'PENDING_SECOND_FIRST'
      ) {
        return NextResponse.json(false, { status: 200 });
      }
      return NextResponse.json(true, { status: 200 });
    } else {
      throw new Error('No userId found');
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: err }, { status: 400 });
  }
}
