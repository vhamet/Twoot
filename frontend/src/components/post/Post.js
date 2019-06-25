import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Avatar from 'components/avatar/Avatar';

import { timeDifferenceForDate } from 'utils';

class Post extends Component {
  render() {
    const {
      content,
      createdAt,
      postedBy: { id, username }
    } = this.props.post;
    return (
      <div className="post__container">
        <div className="post-info__container">
          <Avatar id={id} size="2.5rem" />
          <div>
            <Link to={`/user/:${id}`}>{username}</Link>
            <label>{timeDifferenceForDate(createdAt)}</label>
          </div>
        </div>
        <div className="post__content">
          <pre>{content}</pre>
        </div>
      </div>
    );
  }
}

export default Post;
