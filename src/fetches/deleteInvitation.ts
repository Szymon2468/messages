export const deleteInvitation = async (receiverId: string) => {
  try {
    return await fetch('api/user/invitations/delete-invitation-by-user', {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ receiverId })
    });
  } catch (err) {
    console.error(err);
  }
};
