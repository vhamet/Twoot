import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'components/avatar/Avatar';

const Post = props => {
  const {
    content,
    date,
    postedBy: { id, username }
  } = props.post;

  return (
    <div className="post__container">
      <div className="post-info__container">
        <Avatar id={id} size="2.5rem" />
        <div>
          <Link to={`/user/:${id}`}>{username}</Link>
          <label>{date}</label>
        </div>
      </div>
      <div className="post__content">
        <pre>{content}</pre>
      </div>
    </div>
  );
};

export default memo(Post);
