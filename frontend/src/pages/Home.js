import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';

import CreatePost from 'components/post/CreatePost';
import PostList from 'components/post/PostList';

import AuthenticationContext from 'context/AuthenticationContext';

import { FEED_PAGINATION } from 'constants.js';
import { FEED_QUERY, CACHED_FEED_QUERY } from 'apollo/queries';
import { timeDifferenceForDate } from 'utils';

import 'styles/css/home.css';

const Home = props => {
  const [after, setAfter] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  const handleNewPost = async (client, post) => {
    const data = client.readQuery({
      query: CACHED_FEED_QUERY
    });
    data.feed = [post, ...data.feed];

    setCachedData(client, data);
  };

  const handleLoadFeed = async client => {
    console.log('handleLoadFeed');
    setLoading(true);
    const { data } = await client.query({
      query: FEED_QUERY,
      variables: { first: FEED_PAGINATION }
    });

    setCachedData(client, data);
  };

  const handleLoadMore = async client => {
    setLoading(true);
    const cachedData = client.cache.readQuery({
      query: CACHED_FEED_QUERY
    });

    const { data } = await client.query({
      query: FEED_QUERY,
      variables: { first: FEED_PAGINATION, after }
    });

    cachedData.feed = [...cachedData.feed, ...data.feed];
    setCachedData(client, cachedData);
  };

  const setCachedData = (client, data) => {
    const feed = data.feed.map(post => ({
      ...post,
      timespan: timeDifferenceForDate(post.createdAt)
    }));
    client.writeData({
      query: CACHED_FEED_QUERY,
      data: { feed }
    });
    setAfter(feed[feed.length - 1].id);
    setPosts(feed);
    setLoading(false);
  };

  return (
    <AuthenticationContext.Consumer>
      {context => (
        <ApolloConsumer>
          {client => (
            <div className="home">
              {context.token && <CreatePost newPost={handleNewPost} />}
              {}
              <PostList
                loading={loading}
                posts={posts}
                loadFeed={() => handleLoadFeed(client)}
                loadMore={() => handleLoadMore(client)}
              />
            </div>
          )}
        </ApolloConsumer>
      )}
    </AuthenticationContext.Consumer>
  );
};

export default Home;
