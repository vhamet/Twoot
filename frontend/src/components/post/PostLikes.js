import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const PostLikes = props => {
  const getUserList = users =>
    users
      .map(user => user.username)
      .reduce((acc, curr) => (acc.includes(curr) ? acc : acc.concat(curr)), []);

  const users = getUserList(props.likes);

  const tooltip = getUserList(props.likes)
    .slice(0, 5)
    .concat(users.length > 5 ? `and ${users.length - 5} more...` : [])
    .join('\n');

  return (
    <div className="post-likes__container">
      <div className="post-likes">
        <FontAwesomeIcon icon={faThumbsUp} />
      </div>
      <label>{props.likes.length}</label>
      <pre className="tooltip">{tooltip}</pre>
    </div>
  );
};

export default PostLikes;
