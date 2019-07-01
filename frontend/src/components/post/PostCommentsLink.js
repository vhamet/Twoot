import React from 'react';

const PostCommentsLink = props => {
  const users = props.comments
    .map(comment => comment.postedBy.username)
    .reduce((acc, curr) => (acc.includes(curr) ? acc : acc.concat(curr)), []);

  const tooltip = props.comments
    .map(comment => comment.postedBy.username)
    .reduce((acc, curr) => (acc.includes(curr) ? acc : acc.concat(curr)), [])
    .slice(0, 5)
    .concat(users.length > 5 ? `and ${users.length - 5} more...` : [])
    .join('\n');

  return (
    <div className="post-comments__link" onClick={props.onClick}>
      {`${props.comments.length} comments`}
      <pre className="tooltip">{tooltip}</pre>
    </div>
  );
};

export default PostCommentsLink;
