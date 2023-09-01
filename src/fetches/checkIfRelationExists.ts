export const checkIfRelationExists = async (receiverId: number) => {
  try {
    return await fetch('api/user/invitations/check', {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ receiverId })
    });
  } catch (err) {
    console.error(err);
  }
};
