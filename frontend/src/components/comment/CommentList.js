import React from 'react';

import Comment from 'components/comment/Comment';

const CommentList = ({ userId, comments }) =>
  comments.map(comment => <Comment key={comment.id} userId={userId} comment={comment} />);

export default CommentList;
