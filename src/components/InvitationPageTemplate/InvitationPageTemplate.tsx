'use client';

import { Fragment, useEffect, useState } from 'react';
import AuthenticatedPage from '../AuthenticatedPage/AuthenticatedPage';
import getUUID from '@/utils/getUUID';
import InvitationTile from '../InvitationTile/InvitationTile';
import { deleteInvitation } from '@/fetches/deleteInvitation';

const InvitationPageTemplate = ({
  incomingInvitations,
  outcomingInvitations
}: any) => {
  console.log('incomingInvitationsincomingInvitations', incomingInvitations);
  console.log('outcomingInvitations', outcomingInvitations);
  // if (incomingInvitations.length < 1) {
  //   return <p>Nie masz zadnych zaproszen</p>;
  // }

  const [_incomingInvitations, setIncomingInvitations] =
    useState(incomingInvitations);
  const [_outcomingInvitations, setOutcomingInvitations] =
    useState(outcomingInvitations);

  useEffect(() => {
    setIncomingInvitations(incomingInvitations);
  }, [incomingInvitations]);

  useEffect(() => {
    setOutcomingInvitations(outcomingInvitations);
  }, [outcomingInvitations]);

  if (
    _incomingInvitations === undefined ||
    _outcomingInvitations === undefined
  ) {
    console.log('jakies zapro sa undifined');
    return null;
  }

  return (
    <AuthenticatedPage>
      <div>
        <h3>Wchodzace</h3>
        <div>
          {_incomingInvitations &&
            _incomingInvitations.map((invitation: any) => (
              <Fragment key={getUUID()}>
                <div>
                  <p> {invitation.name} wysłał Ci zaproszenie</p>
                  <div>
                    <button>Zaakceptuj</button>
                    <button>Odrzuć</button>
                  </div>
                </div>
              </Fragment>
            ))}
        </div>
      </div>

      <div>
        <h3>Wychodzace</h3>
        <div>
          {_outcomingInvitations &&
            _outcomingInvitations.map((invitation: any) => (
              <Fragment key={getUUID()}>
                <div>
                  <p>wyslano zaproszenie do {invitation.name}</p>
                  <button
                    onClick={async () => {
                      await deleteInvitation(invitation.id);
                      const newArray = _outcomingInvitations.filter(
                        (el: any) => el.id !== invitation.id
                      );
                      setOutcomingInvitations(newArray);
                    }}
                  >
                    Anuluj zaproszenie
                  </button>
                </div>
              </Fragment>
            ))}
        </div>
      </div>
    </AuthenticatedPage>
  );
};

export default InvitationPageTemplate;
