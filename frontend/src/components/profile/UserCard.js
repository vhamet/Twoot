import React from 'react';
import { Link } from 'react-router-dom';

import FollowButton from 'components/form/FollowButton';
import Avatar from 'components/avatar/Avatar';

const UserCard = ({ user }) => (
  <div className="usercard__container">
    <Avatar src={user.avatar} size="6rem" square={true} />
    <div>
      <Link to={`/profile/${user.id}`} className="profile-link">
        {user.username}
      </Link>
      <label>{user.followers.length} followers</label>
    </div>
    <FollowButton user={user} />
  </div>
);

export default UserCard;