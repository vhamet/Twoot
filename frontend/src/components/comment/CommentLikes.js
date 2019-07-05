import React from 'react';

import like from 'images/like.png';

const CommentLikes = ({ likes }) => {
  const getUserList = users =>
    users
      .map(user => user.username)
      .reduce((acc, curr) => (acc.includes(curr) ? acc : acc.concat(curr)), []);

  const users = getUserList(likes);

  const tooltip = getUserList(likes)
    .slice(0, 5)
    .concat(users.length > 5 ? `and ${users.length - 5} more...` : [])
    .join('\n');

  return (
    <div className="comment-likes__container">
      <img src={like} alt="like" />
      <label>{likes.length}</label>
      <pre className="tooltip">{tooltip}</pre>
    </div>
  );
};

export default CommentLikes;
