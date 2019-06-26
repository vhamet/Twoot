import React, { Component } from 'react';

import CreatePost from 'components/post/CreatePost';
import PostList from 'components/post/PostList';

import AuthenticationContext from 'context/AuthenticationContext';

import 'Styles/css/home.css';

const Home = props => (
  <AuthenticationContext.Consumer>
    {context => {
      return (
        <div className="home">
          {context.token && <CreatePost />}
          <PostList />
        </div>
      );
    }}
  </AuthenticationContext.Consumer>
);

export default Home;
