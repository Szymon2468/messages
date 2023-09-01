import { newUserSchema } from '@/yup/newUserSchema';
import type Prisma from '@prisma/client';

export const addNewUser = async (data: Partial<Prisma.User>) => {
  await newUserSchema.validate(data);

  const res = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    return await res.json();
  } else {
    console.log(res);
  }
};
