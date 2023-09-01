import HomePageTemplate from '@/components/HomePageTemplate/HomePageTemplate';
import { getAllUsers } from '@/fetches/getAllUsers';
import type Prisma from '@prisma/client';

export default async function HomePage() {
  const users: Prisma.User[] = await getAllUsers();

  if (users) {
    return <HomePageTemplate users={users} />;
  }
  return null;
}
