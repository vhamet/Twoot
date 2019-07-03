import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'components/avatar/Avatar';
import TimeSince from 'components/form/TimeSince';
import DropDown from 'components/form/DropDown';

import 'styles/css/comment.css';

const Comment = props => {
  const {
    content,
    postedBy: { id: commentById, username, avatar },
    date,
    timespan
  } = props.comment;

  return (
    <div className="comment__container">
      <Avatar size="2.2rem" id={commentById} src={avatar}/>
      <div className="comment__layout">
        <div className="comment__content">
          <Link className="profile-link" to={`/profile/${commentById}`}>
            {username}
          </Link>
          {content}
        </div>
        <TimeSince timespan={timespan} date={date} />
      </div>
      {props.loggedUserId === commentById && (
        <DropDown menu={<div>•••</div>}>
          <ul className="comment__dropdownmenu">
            <li>
              <label>✎ Update comment</label>
            </li>
            <li>
              <label>⌦ Delete comment</label>
            </li>
          </ul>
        </DropDown>
      )}
    </div>
  );
};

export default Comment;
