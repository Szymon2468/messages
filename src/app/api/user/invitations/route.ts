import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../utils/prismaClient';
import { decode } from 'next-auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('next-auth.session-token')?.value || '';
    const decoded = await decode({ token, secret: process.env.SECRET || '' });

    const userId = decoded && Number(decoded.sub);

    const { receiverId } = await req.json();

    if (decoded && userId && receiverId) {
      await prisma.userRelationship.create({
        data: {
          userFirstId: userId,
          userSecondId: receiverId,
          relationStatus: 'PENDING_FIRST_SECOND'
        }
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get('next-auth.session-token')?.value || '';
    const decoded = await decode({ token, secret: process.env.SECRET || '' });

    const userId = decoded && Number(decoded.sub);

    const {
      secondUserId,
      actionType
    }: { secondUserId: number; actionType: string } = await req.json();

    console.log('userId', secondUserId);
    console.log('typeof userId', typeof secondUserId);
    if (decoded) {
      if (!userId || typeof parseInt(String(userId)) !== 'number') {
        throw new Error('Invalid ID');
      }

      if (!secondUserId || typeof parseInt(String(secondUserId)) !== 'number') {
        throw new Error('Invalid ID');
      }

      if (actionType === 'ACCEPT') {
        await prisma.userRelationship.update({
          where: {
            userFirstId_userSecondId: {
              userFirstId: userId,
              userSecondId: secondUserId
            }
          },
          data: { relationStatus: 'FRIENDS' }
        });
      }

      actionType === 'REJECT' &&
        (await prisma.userRelationship.delete({
          where: {
            userFirstId_userSecondId: {
              userFirstId: userId,
              userSecondId: secondUserId
            }
          }
        }));

      actionType === 'SENT' &&
        (await prisma.userRelationship.update({
          where: {
            userFirstId_userSecondId: {
              userFirstId: userId,
              userSecondId: secondUserId
            }
          },
          data: { relationStatus: 'PENDING_FIRST_SECOND' }
        }));
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}
