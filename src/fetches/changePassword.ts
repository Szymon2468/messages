import type Prisma from '@prisma/client';

export const changePassword = async (data: Partial<Prisma.User>) => {
  const res = await fetch('/api/auth/change-password', {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    return await res.json();
  } else {
    console.log(res);
  }
};
