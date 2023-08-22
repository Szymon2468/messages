import AuthenticatedPage from '@/components/AuthenticatedPage/AuthenticatedPage';
import InvitationPageTemplate from '@/components/InvitationPageTemplate/InvitationPageTemplate';
import { getAllUserInvitations } from '@/fetches/getAllUserInvitations';

const InvitatiosnPage = async () => {
  const invitations = await getAllUserInvitations();

  if (!invitations) {
    return null;
  }

  return (
    <AuthenticatedPage>
      <InvitationPageTemplate invitations={invitations} />
    </AuthenticatedPage>
  );
};

export default InvitatiosnPage;
