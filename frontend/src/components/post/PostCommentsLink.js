import React from 'react';

const PostCommentsLink = props => {
  const getUserList = users =>
    users
      .map(comment => comment.postedBy.username)
      .reduce((acc, curr) => (acc.includes(curr) ? acc : acc.concat(curr)), []);

  const users = getUserList(props.comments);

  const tooltip = getUserList(props.comments)
    .slice(0, 5)
    .concat(users.length > 5 ? `and ${users.length - 5} more...` : [])
    .join('\n');

  return (
    <div className="post-comments__link" onClick={props.onClick}>
      {`${props.count} comments`}
      <pre className="tooltip">{tooltip}</pre>
    </div>
  );
};

export default PostCommentsLink;
