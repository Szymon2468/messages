import { prisma } from './prismaClient';

export const checkIfTokenExists = async (token: string) => {
  try {
    const isToken = await prisma.verificationToken.findFirst({
      where: { token: token },
      select: { token: true }
    });

    if (isToken) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};
