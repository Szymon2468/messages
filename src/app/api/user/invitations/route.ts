import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../utils/prismaClient';
import { decode } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('next-auth.session-token')?.value || '';
    const decoded = await decode({ token, secret: process.env.SECRET || '' });

    const userId = decoded && Number(decoded.sub);

    if (decoded) {
      if (!userId || typeof parseInt(String(userId)) !== 'number') {
        throw new Error('Invalid ID');
      }

      const userInvitations = await prisma.invitation.findMany({
        where: { userToId: userId }
      });

      return NextResponse.json(userInvitations, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('next-auth.session-token')?.value || '';
    const decoded = await decode({ token, secret: process.env.SECRET || '' });

    const userId = decoded && Number(decoded.sub);

    const { receiverId } = await req.json();

    if (decoded && userId && receiverId) {
      await prisma.invitation.create({
        data: {
          userFromId: userId,
          userToId: receiverId
        }
      });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}
