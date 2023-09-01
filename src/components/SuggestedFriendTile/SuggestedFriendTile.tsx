import { checkIfRelationExists } from '@/fetches/checkIfRelationExists';
import { sendInvitation } from '@/fetches/sendInvitation';
import getUUID from '@/utils/getUUID';
import { Fragment, MutableRefObject, useEffect, useState } from 'react';
import type Prisma from '@prisma/client';
import styles from './SuggestedFriendTile.module.scss';

const getComponentUsers = (users: any) =>
  users.map((user: any) => ({
    id: user.id,
    name: user.name,
    isBtn:
      user.userRelationsFirst.length > 0 || user.userRelationsSecond.length > 0
        ? false
        : true
  }));

const SuggestedFriendTiles = ({ users }: any) => {
  const [_users, setUsers]: any = useState(getComponentUsers(users));

  useEffect(() => {
    setUsers(getComponentUsers(users));
  }, [users]);

  return (
    <>
      {_users.map((user: any) => (
        <Fragment key={getUUID()}>
          <p>{user.name}</p>
          {user.isBtn && (
            <button
              onClick={async () => {
                await sendInvitation(user.id);
                setUsers(
                  _users.map((_user: any) =>
                    _user.id === user.id ? { ..._user, isBtn: false } : _user
                  )
                );
              }}
            >
              Wyslij zaproszenie
            </button>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default SuggestedFriendTiles;
