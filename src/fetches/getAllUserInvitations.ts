export const getAllUserInvitations = async () => {
  try {
    return await fetch('api/user/invitations', {
      headers: { 'Content-type': 'application/json' },
      method: 'GET'
    }).then((resp) => resp.json());
  } catch (err) {
    console.error(err);
  }
};
