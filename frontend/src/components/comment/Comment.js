import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'components/avatar/Avatar';
import TimeSince from 'components/form/TimeSince';

import 'styles/css/comment.css';

const Comment = ({
  comment: {
    content,
    postedBy: { userId, username },
    date,
    timespan
  }
}) => (
  <div className="comment__container">
    <Avatar size="2.2rem" id={userId} />
    <div className="comment__layout">
      <div className="comment__content">
        <Link className="profile-link" to={`/profile/:${userId}`}>
          {username}
        </Link>
        {content}
      </div>
      <TimeSince timespan={timespan} date={date} />
    </div>
  </div>
);

export default Comment;
