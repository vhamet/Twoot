import React, { Component } from 'react';

import CreatePost from 'components/post/CreatePost';
import PostList from 'components/post/PostList';

import AuthenticationContext from 'context/AuthenticationContext';

import 'Styles/css/feed.css';

const Feed = props => (
  <AuthenticationContext.Consumer>
    {context => {
      return (
        <div className="feed">
          {context.token && <CreatePost />}
          <PostList />
        </div>
      );
    }}
  </AuthenticationContext.Consumer>
);

export default Feed;
