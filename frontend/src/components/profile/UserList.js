import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import UserCard from 'components/profile/UserCard';

import 'styles/css/userList.css';

const UserList = ({ title, users }) => {
  return (
    <div className="userlist__container">
      <div className="userlist-title">
        <FontAwesomeIcon icon={faUsers} />
        <label>{title}</label>
      </div>
      <div className="usercards_container">
        {users.length ? (
          users.map(user => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="usercards-empty">Nothing to show</div>
        )}
      </div>
    </div>
  );
};

export default UserList;
