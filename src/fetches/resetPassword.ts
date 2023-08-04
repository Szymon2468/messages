export const resetPassword = async (data: any) => {
  const res = await fetch(`api/auth/reset-password/${data.token}`, {
    headers: { 'Content-type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(data)
  });

  if (res.ok) {
    return res;
  } else {
    console.error(res);
    return;
  }
};
