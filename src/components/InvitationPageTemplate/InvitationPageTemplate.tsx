import { Fragment } from 'react';
import AuthenticatedPage from '../AuthenticatedPage/AuthenticatedPage';
import getUUID from '@/utils/getUUID';
import InvitationTile from '../InvitationTile/InvitationTile';

const InvitationPageTemplate = ({ invitations }: any) => {
  if (invitations.length < 1) {
    return <p>Nie masz zadnych zaproszen</p>;
  }

  return (
    <AuthenticatedPage>
      <div>
        {invitations.map((invitation: any) => {
          <Fragment key={getUUID()}>
            <InvitationTile name={invitation.name} />
          </Fragment>;
        })}
      </div>
    </AuthenticatedPage>
  );
};

export default InvitationPageTemplate;
