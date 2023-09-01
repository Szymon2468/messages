import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export const getAllUserInvitations = async (actionType: string) => {
  try {
    return await fetch(
      'http://localhost:3001/api/user/invitations/get-invitations-by-user',
      {
        next: { revalidate: 0 },
        cache: 'no-cache',
        // cache: 'no-store',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookies().toString()
        },
        method: 'POST',
        body: JSON.stringify({ actionType })
      }
    ).then((resp) => resp.json());
  } catch (err) {
    console.error(err);
  }
};
