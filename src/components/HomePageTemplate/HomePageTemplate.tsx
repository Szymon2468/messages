'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { Fragment, SyntheticEvent } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { getAllUsers } from '@/fetches/getAllUsers';
import getUUID from '@/utils/getUUID';
import { sendInvitation } from '@/fetches/sendInvitation';

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
            {users.map((user: any) => (
              <Fragment key={getUUID()}>
                <p>{user.name}</p>
                <button
                  onClick={async () => {
                    await sendInvitation(user.id);
                  }}
                >
                  Wyslij zaproszenie
                </button>
              </Fragment>
            ))}
          </ul>
        </>
      )}
    </main>
  );
};

export default HomePageTemplate;
