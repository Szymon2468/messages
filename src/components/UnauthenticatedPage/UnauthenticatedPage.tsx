'use client';

import { useSession } from 'next-auth/react';

const UnauthenticatedPage = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === 'authenticated') {
    return <p>Nie mozna byc zalogowanym</p>;
  }

  if (status === 'loading') {
    return <p>loading...</p>;
  }

  return <>{children}</>;
};

export default UnauthenticatedPage;
