import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import PostCommentsLink from 'components/post/PostCommentsLink';
import CreateComment from 'components/comment/CreateComment';
import CommentList from 'components/comment/CommentList';
import Avatar from 'components/avatar/Avatar';
import TimeSince from 'components/form/TimeSince';
import DropDown from 'components/form/DropDown';

const Post = props => {
  const {
    id: postId,
    content,
    timespan,
    date,
    postedBy: { id: userId, username },
    comments
  } = props.post;

  const [displayComments, setDisplayComments] = useState(true);

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
          {props.userId === userId && (
            <DropDown menu={<div>•••</div>}>
              <ul className="post__dropdownmenu">
                <li>
                  <label>✎ Update post</label>
                </li>
                <li>
                  <label>⌦ Delete post</label>
                </li>
              </ul>
            </DropDown>
          )}
        </div>
        <div className="post__content">
          <pre>{content}</pre>
        </div>
        {comments.length > 0 && (
          <PostCommentsLink
            comments={comments}
            onClick={() => setDisplayComments(!displayComments)}
          />
        )}
      </div>
      {displayComments && comments.length > 0 && (
        <div className="comments__container">
          <CommentList userId={userId} comments={comments} />
          {props.userId && <CreateComment postId={postId} />}
        </div>
      )}
    </>
  );
};

export default Post;
