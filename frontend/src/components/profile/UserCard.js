import React from 'react';
import { Link } from 'react-router-dom';

import FollowButton from 'components/form/FollowButton';
import Avatar from 'components/avatar/Avatar';

import 'styles/css/userCard.css';

const UserCard = ({ user }) => (
  <div className="usercard__container">
    <Avatar src={user.avatar} size="6rem" square={true} />
    <div>
      <div>
        <Link to={`/profile/${user.id}`} className="profile-link">
          {user.username}
        </Link>
        <label>{user.followers.length} followers</label>
      </div>
      <FollowButton user={user} />
    </div>
  </div>
);

export default UserCard;
