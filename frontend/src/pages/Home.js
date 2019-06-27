import React, { useState } from 'react';
import { Query, ApolloConsumer } from 'react-apollo';

import CreatePost from 'components/post/CreatePost';
import PostList from 'components/post/PostList';

import AuthenticationContext from 'context/AuthenticationContext';

import { FEED_QUERY } from 'apollo/queries';

import 'styles/css/home.css';

const Home = props => {
  const [first, setFirst] = useState(5);
  const [skip, setSkip] = useState(0);
  const [orderBy, setOrderBy] = useState('createdAt_DESC');

  const handleLoadMore = async client => {
    const cachedData = client.cache.readQuery({
      query: FEED_QUERY,
      variables: { first, skip: 0, orderBy }
    });
    const { data } = await client.query({
      query: FEED_QUERY,
      variables: { first: 5, skip: skip + 5, orderBy }
    });

    data.feed.posts = [...cachedData.feed.posts, ...data.feed.posts];
    client.writeData({
      query: FEED_QUERY,
      data,
      variables: { first: first + 5, skip: 0, orderBy }
    });
    setSkip(skip + 5);
    setFirst(first + 5);
  };

  return (
    <AuthenticationContext.Consumer>
      {context => (
        <ApolloConsumer>
          {client => (
            <div className="home">
              {context.token && <CreatePost />}
              <Query query={FEED_QUERY} variables={{ first, skip: 0, orderBy }}>
                {({ loading, error, data }) => {
                  if (error) return <div>Error</div>;
                  const posts = data.feed ? data.feed.posts : null;
                  return (
                    <PostList
                      loading={loading}
                      error={error}
                      posts={posts}
                      loadMore={() => handleLoadMore(client)}
                    />
                  );
                }}
              </Query>
            </div>
          )}
        </ApolloConsumer>
      )}
    </AuthenticationContext.Consumer>
  );
};

export default Home;
