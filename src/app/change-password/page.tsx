'use client';

import { changePassword } from '@/fetches/changePassword';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SyntheticEvent } from 'react';

const ChangePasswordPage = () => {
  const router = useRouter();
  const { status } = useSession();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      oldPassword: { value: string };
      password: { value: string };
      repeatedPassword: { value: string };
    };

    const { password, repeatedPassword, oldPassword } = target;

    const data = {
      passwordHash: password.value
    };

    if (password.value != repeatedPassword.value) {
      throw new Error('hasla musza sie zgadzac jak siano');
    } else if (oldPassword.value === password.value) {
      throw new Error('Haslo nowe nie moze byc takie samo jak stare');
    } else {
      await changePassword(data);
      console.log('hasla poszly na backend');
    }
  };

  return (
    <>
      {status === 'authenticated' && (
        <main>
          <form onSubmit={handleSubmit}>
            <label htmlFor='oldPassword'>stare haslo:</label>
            <input type='password' name='oldPassword' />

            <label htmlFor='password'>haslo:</label>
            <input type='password' name='password' />

            <label htmlFor='repeatedPassword'>powtorz haslo:</label>
            <input type='password' name='repeatedPassword' />

            <button type='submit'>zmien haslo</button>
          </form>
        </main>
      )}
      {status === 'unauthenticated' && <p>trzeba byc zalogowanym</p>}
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

export default ChangePasswordPage;
