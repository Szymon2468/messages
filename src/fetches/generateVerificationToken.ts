export const generateVerificationToken = async (data: any) => {
  const res = await fetch('api/auth/reset-password', {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data)
  });

  if (res.ok) {
    return res;
  } else {
    console.error(res);
    return;
  }
};
