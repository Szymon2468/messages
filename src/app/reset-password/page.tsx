'use client';

import { generateVerificationToken } from '@/fetches/generateVerificationToken';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SyntheticEvent } from 'react';
import { checkIfTokenExists } from '../api/utils/checkIfTokenExists';
import { sendMail } from '@/app/api/utils/sendMail';

const ResetPasswordPage = () => {
  const router = useRouter();
  const { status } = useSession();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
    };

    const { email } = target;

    const data = {
      email: email.value
    };

    await generateVerificationToken(data);
  };

  return (
    <>
      {status === 'loading' && <p>loading</p>}
      {status === 'unauthenticated' && (
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>email:</label>
          <input type='email' name='email' />

          <button type='submit'>dalej</button>
        </form>
      )}
      {status === 'authenticated' && (
        <p>jestes zalogowany to tu niczego nie znajdziesz</p>
      )}
    </>
  );
};

export default ResetPasswordPage;
