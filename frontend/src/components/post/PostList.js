import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';

import Spinner from 'components/spinner/Spinner';
import Post from 'components/post/Post';

import { FEED_QUERY } from 'apollo/queries';

class PostList extends Component {
  render() {
    const first = 5;
    const skip = 0;
    const orderBy = 'createdAt_DESC';
    return (
      <Query query={FEED_QUERY} variables={{ first, skip, orderBy }}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return <div>Error</div>;
          const postsToRender = data.feed.posts;
          return (
            <Fragment>
              {postsToRender.map((post, index) => (
                <Post key={post.id} post={post} />
              ))}
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default PostList;
