'use client';

import Image from 'next/image';
import styles from './page.module.css';
import { SyntheticEvent } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const HomePageTemplate = () => {
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
        <p>jestes zalogowany to tu niczego nie znajdziesz</p>
      )}
    </main>
  );
};

export default HomePageTemplate;
