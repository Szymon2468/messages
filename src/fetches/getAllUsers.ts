import { cookies } from 'next/headers';

export const getAllUsers = async () => {
  try {
    return await fetch('http://localhost:3001/api/users', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString()
      },
      cache: 'no-store'
    }).then((resp) => resp.json());
  } catch (err) {
    console.error(err);
  }
};
