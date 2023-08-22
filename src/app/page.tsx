'use client';

import HomePageTemplate from '@/components/HomePageTemplate/HomePageTemplate';
import { getAllUsers } from '@/fetches/getAllUsers';
import { SessionProvider } from 'next-auth/react';

export default async function HomePage() {
  const users = await getAllUsers();

  return (
    <SessionProvider>
      <HomePageTemplate users={users} />
    </SessionProvider>
  );
}
