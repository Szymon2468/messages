export const sendInvitation = async (receiverId: number) => {
  try {
    return await fetch('api/user/invitations', {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(receiverId)
    });
  } catch (err) {
    console.error(err);
  }
};
