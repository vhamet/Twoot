import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'components/avatar/Avatar';

const Post = props => {
  const {
    content,
    timespan,
    postedBy: { userId, username }
  } = props.post;
  return (
    <>
      <div className="post__container">
        <div className="post-info__container">
          <Avatar id={userId} size="2.5rem" />
          <div>
            <Link className="profile-link" to={`/user/:${userId}`}>
              {username}
            </Link>
            <label>{timespan}</label>
          </div>
        </div>
        <div className="post__content">
          <pre>{content}</pre>
        </div>
      </div>
    </>
  );
};

export default memo(Post);
