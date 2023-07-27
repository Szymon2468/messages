'use client';

import { SyntheticEvent } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { data, status } = useSession();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const { email, password } = target;

    const res = await signIn('credentials', {
      email: email.value,
      password: password.value,
      redirect: false
    });

    if (res?.error) {
      console.error(res.error);
    } else {
      console.log('jestem');
      router.replace('/homepage');
    }

    console.log(res);
  };
  return (
    <main>
      {status === 'loading' && <p>loading</p>}
      {status === 'unauthenticated' && (
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>E-mail</label>
          <input type='email' name='email' />

          <label htmlFor='password'>Haslo:</label>
          <input type='password' name='password' />

          <button type='submit'>Zaloguj</button>
        </form>
      )}
      {status === 'authenticated' && (
        <p>jestes zalogowany to tu niczego nie znajdziesz</p>
      )}
      {status === 'authenticated' && (
        <button
          onClick={() => {
            signOut({ callbackUrl: 'http://localhost:3000/' });
          }}
        >
          wyloguj sie
        </button>
      )}
    </main>
  );
}
