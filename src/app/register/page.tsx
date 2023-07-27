'use client';

import { addNewUser } from '@/fetches/addNewUser';
import { SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const RegisterPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      repeatedPassword: { value: string };
      name: { value: string };
    };

    const { email, password, repeatedPassword, name } = target;

    const data = {
      name: name.value,
      email: email.value,
      passwordHash: password.value
    };

    console.log(data);

    if (password.value === repeatedPassword.value) {
      router.replace('/login');
      await addNewUser(data);
    } else {
      throw new Error('hasla musza sie zgadzac jak siano');
    }
  };

  return (
    <main>
      {status === 'loading' && <p>loading</p>}
      {status === 'unauthenticated' && (
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>nazwa</label>
          <input type='text' name='name' />

          <label htmlFor='email'>email:</label>
          <input type='email' name='email' />

          <label htmlFor='password'>haslo:</label>
          <input type='password' name='password' />

          <label htmlFor='repeatedPassword'>powtorz haslo:</label>
          <input type='password' name='repeatedPassword' />

          <button type='submit'>zaloz konto</button>
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
};

export default RegisterPage;
