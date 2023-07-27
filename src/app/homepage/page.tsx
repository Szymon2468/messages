'use client';

import { signOut, useSession } from 'next-auth/react';

const HomePageLoggedUser = () => {
  const { data, status } = useSession();

  return (
    <>
      {status === 'authenticated' && (
        <>
          <p>zalogowany!!!!!!</p>
          <p>{data?.user?.name}</p>
          <p>{data?.user?.email}</p>
        </>
      )}
      {status === 'loading' && <p>loading</p>}
      {status === 'unauthenticated' && <p>niezalogowany</p>}
      {status === 'authenticated' && (
        <button
          onClick={() => {
            signOut({ callbackUrl: 'http://localhost:3000/' });
          }}
        >
          wyloguj sie
        </button>
      )}
    </>
  );
};

export default HomePageLoggedUser;
