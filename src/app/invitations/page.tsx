import AuthenticatedPage from '@/components/AuthenticatedPage/AuthenticatedPage';
import InvitationPageTemplate from '@/components/InvitationPageTemplate/InvitationPageTemplate';
import { getAllUserInvitations } from '@/fetches/getAllUserInvitations';

const InvitatiosnPage = async () => {
  const outcomingInvitations1 = await getAllUserInvitations('OUTCOMING');
  const incomingInvitations1: { randomNr: number; result: Array<Object> } =
    await getAllUserInvitations('INCOMING');

  const outcomingInvitations = outcomingInvitations1.result;
  const { result, randomNr } = incomingInvitations1;
  const incomingInvitations = result;

  if (!incomingInvitations || !outcomingInvitations) {
    return <>lol</>;
  }

  console.log('incomingInvitations', incomingInvitations);
  console.log('outcomingInvitations', outcomingInvitations);

  return (
    <AuthenticatedPage>
      <InvitationPageTemplate
        incomingInvitations={incomingInvitations}
        outcomingInvitations={outcomingInvitations}
      />
    </AuthenticatedPage>
  );
};

export default InvitatiosnPage;
