'use client';

import { useSession } from 'next-auth/react';

const AuthenticatedPage = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    return <p>Trzeba byc zalogowanym</p>;
  }

  if (status === 'loading') {
    return <p>loading...</p>;
  }

  return <>{children}</>;
};

export default AuthenticatedPage;
