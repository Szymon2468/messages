'use client';

import HomePageTemplate from '@/components/HomePageTemplate/HomePageTemplate';
import { SessionProvider } from 'next-auth/react';

export default function HomePage() {
  return (
    <SessionProvider>
      <HomePageTemplate />
    </SessionProvider>
  );
}
