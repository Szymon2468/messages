'use client';
import { resetPassword } from '@/fetches/resetPassword';
import { SyntheticEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PageLayout = ({ token }: { token: string }) => {
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const target = e.target as typeof e.target & {
        firstNewPassword: { value: string };
        secondNewPassword: { value: string };
      };

      const { firstNewPassword, secondNewPassword } = target;

      if (firstNewPassword.value != secondNewPassword.value) {
        toast.error('Podane hasła muszą być takie same');
      } else {
        await resetPassword(token, firstNewPassword.value);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstNewPassword'>Podaj nowe haslo</label>
        <input type='password' name='firstNewPassword' />

        <label htmlFor='secondNewPassword'>Podaj nowe haslo po raz drugi</label>
        <input type='password' name='secondNewPassword' />

        <button type='submit'>Zresetuj haslo</button>
      </form>
    </>
  );
};

export default PageLayout;
