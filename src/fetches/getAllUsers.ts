export const getAllUsers = async () => {
  try {
    return await fetch('api/users', {
      headers: { 'Content-type': 'application/json' },
      method: 'GET'
    }).then((resp) => resp.json());
  } catch (err) {
    console.error(err);
  }
};
