import React, { Component } from 'react';

import CreatePost from 'components/post/CreatePost';
import PostList from 'components/post/PostList';

import 'Styles/css/feed.css';

class Feed extends Component {
  render() {
    return (
      <div className="feed">
        <CreatePost />
        <PostList />
      </div>
    );
  }
}

export default Feed;
