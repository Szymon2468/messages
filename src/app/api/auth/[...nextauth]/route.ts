import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import credentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../utils/prismaClient';
import * as bcrypt from 'bcrypt';

declare module 'next-auth' {
  interface User {
    id: number;
  }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  secret: process.env.SECRET,
  providers: [
    credentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findFirst({ where: { email } });

        if (user) {
          const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash
          );

          if (isPasswordValid) {
            return user;
          } else {
            throw new Error('Password is not valid');
          }
        } else {
          throw new Error('User not found');
        }
      }
    })
  ]
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
