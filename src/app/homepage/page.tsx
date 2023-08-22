'use client';

import AuthenticatedPage from '@/components/AuthenticatedPage/AuthenticatedPage';
import { signOut, useSession } from 'next-auth/react';

const HomePageLoggedUser = () => {
  const { data } = useSession();

  return (
    <AuthenticatedPage>
      <>
        <p>zalogowany!!!!!!</p>
        <p>{data?.user?.name}</p>
        <p>{data?.user?.email}</p>
      </>

      <button
        onClick={() => {
          signOut({ callbackUrl: 'http://localhost:3000/' });
        }}
      >
        wyloguj sie
      </button>
    </AuthenticatedPage>
  );
};

export default HomePageLoggedUser;
