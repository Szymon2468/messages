import Image from 'next/image';
import styles from './page.module.css';
import { SyntheticEvent } from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <Link href='/login'>
        <button>zaloguj sie</button>
      </Link>
      <Link href='/register'>
        <button>zarejestruj sie</button>
      </Link>
    </main>
  );
}
