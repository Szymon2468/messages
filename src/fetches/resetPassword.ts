export const resetPassword = async (token: string, newPassword: string) => {
  // const res = await fetch(`api/auth/reset-password/${token}`, {
  //   headers: { 'Content-Type': 'application/json' },
  //   method: 'PUT',
  //   body: JSON.stringify({ newPassword })
  // });

  return await fetch(`/api/auth/reset-password/${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword })
  });

  // if (res.ok) {
  //   return res;
  // } else {
  //   console.error(res);
  //   return;
  // }
};
