'use client';

import { SyntheticEvent } from 'react';

const RegisterPage = () => {
  const handleSubmit = (e: SyntheticEvent) => {
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
      password: password.value,
      repeatedPassword: repeatedPassword.value
    };
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>E-mail</label>
        <input type='text' name='name' />

        <label htmlFor='email'>email:</label>
        <input type='email' name='email' />

        <label htmlFor='password'>haslo:</label>
        <input type='password' name='password' />

        <label htmlFor='repeatedPassword'>powtorz haslo:</label>
        <input type='password' name='repeatedPassword' />
      </form>
    </main>
  );
};

export default RegisterPage;
