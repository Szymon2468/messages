'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import type Prisma from '@prisma/client';
import SuggestedFriendTiles from '../SuggestedFriendTile/SuggestedFriendTile';
import { GetResult } from '@prisma/client/runtime/library';

const HomePageTemplate = ({ users }: any) => {
  const { status } = useSession();

  return (
    <main>
      {status === 'loading' && <p>loading</p>}
      {status === 'unauthenticated' && (
        <>
          <Link href='/login'>
            <button>zaloguj sie</button>
          </Link>
          <Link href='/register'>
            <button>zarejestruj sie</button>
          </Link>{' '}
        </>
      )}
      {status === 'authenticated' && (
        <>
          <h2>Lista uzytkownikow</h2>
          <ul>
            <SuggestedFriendTiles users={users} />
          </ul>
        </>
      )}
    </main>
  );
};

export default HomePageTemplate;
