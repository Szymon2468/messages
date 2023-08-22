'use client';

import { generateVerificationToken } from '@/fetches/generateVerificationToken';
import { SyntheticEvent } from 'react';
import UnauthenticatedPage from '@/components/UnauthenticatedPage/UnauthenticatedPage';

const ResetPasswordPage = () => {
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
    <UnauthenticatedPage>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>email:</label>
        <input type='email' name='email' />

        <button type='submit'>dalej</button>
      </form>
    </UnauthenticatedPage>
  );
};

export default ResetPasswordPage;
