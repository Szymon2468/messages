'use client';

import Link from 'next/link';
import styles from '../../styles/globals.module.scss';
import { useSession } from 'next-auth/react';

const Nav = () => {
  const { status } = useSession();
  return (
    <nav className={styles.nav}>
      <ul>
        <Link href='/'>
          <li>home</li>
        </Link>

        {status === 'unauthenticated' && (
          <Link href='/login'>
            <li>login</li>
          </Link>
        )}

        {status === 'unauthenticated' && (
          <Link href='/register'>
            <li>register</li>
          </Link>
        )}

        {status === 'authenticated' && (
          <Link href='/change-password'>
            <li>change password</li>
          </Link>
        )}

        {status === 'authenticated' && (
          <Link href='/invitations'>
            <li>invitations</li>
          </Link>
        )}

        {status === 'unauthenticated' && (
          <Link href='/reset-password'>
            <li>forgot password</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
