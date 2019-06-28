import React from 'react';

import Comment from 'components/comment/Comment';

const CommentList = ({ comments }) =>
  comments.map(comment => <Comment key={comment.id} comment={comment} />);

export default CommentList;
