'use client';

import { SyntheticEvent } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginPage() {
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
      redirect: true
    });

    console.log(res);
  };
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>E-mail</label>
        <input type='email' name='email' />

        <label htmlFor='password'>Haslo:</label>
        <input type='password' name='password' />

        <button type='submit'>Zaloguj</button>
      </form>

      <button
        onClick={() => {
          signOut();
        }}
      >
        wyloguj sie
      </button>
    </main>
  );
}
