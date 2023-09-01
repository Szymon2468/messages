import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../utils/prismaClient';
import { decode } from 'next-auth/jwt';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    revalidatePath(req.nextUrl.searchParams.get('path') as string);
    const randomNr = Math.random();
    const token = req.cookies.get('next-auth.session-token')?.value || '';
    const decoded = await decode({ token, secret: process.env.SECRET || '' });

    const userId = decoded && Number(decoded.sub);

    const { actionType }: { actionType: string } = await req.json();
    console.log('ACTIONTYPE', actionType);

    if (decoded) {
      if (!userId || typeof parseInt(String(userId)) !== 'number') {
        throw new Error('Invalid ID');
      }

      let userInvitations = null;
      let result: any = [];

      if (actionType === 'INCOMING') {
        userInvitations = await prisma.userRelationship.findMany({
          // where: { userFirstId: userId, relationStatus: 'PENDING_SECOND_FIRST' }
          where: { userSecondId: userId }
        });
        console.log('looooooooooooooooooooooooooool');
        console.log('userInvitations', userInvitations);

        let Ids: any = [];
        for (const userInvitation of userInvitations) {
          Ids.push(userInvitation.userSecondId);
        }
        result = await prisma.user.findMany({
          where: {
            id: {
              in: Ids
            }
          }
        });
      } else {
        userInvitations = await prisma.userRelationship.findMany({
          where: {
            userFirstId: userId
            // relationStatus: 'PENDING_FIRST_SECOND'
          }
        });

        let Ids: any = [];
        for (const userInvitation of userInvitations) {
          Ids.push(userInvitation.userSecondId);
        }
        result = await prisma.user.findMany({
          where: {
            id: {
              in: Ids
            }
          }
        });
      }

      return NextResponse.json({ result, randomNr }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  }
}
