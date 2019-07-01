import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'components/avatar/Avatar';
import TimeSince from 'components/form/TimeSince';

const Post = props => {
  const {
    content,
    timespan,
    date,
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
            <TimeSince timespan={timespan} date={date} />
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
