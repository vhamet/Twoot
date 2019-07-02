import React from 'react';

import Comment from 'components/comment/Comment';

const CommentList = ({ loggedUserId, postById, comments }) =>
  comments.map(comment => (
    <Comment
      key={comment.id}
      loggedUserId={loggedUserId}
      postById={postById}
      comment={comment}
    />
  ));

export default CommentList;
