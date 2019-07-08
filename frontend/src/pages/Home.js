import React, { useContext } from 'react';
import { Query } from 'react-apollo';

import CreatePost from 'components/post/CreatePost';
import PostList from 'components/post/PostList';

import AuthenticationContext from 'context/AuthenticationContext';

import { FEED_PAGINATION } from 'constants.js';
import { INIT_FEED_QUERY, MORE_FEED_QUERY } from 'apollo/queries';
import 'styles/css/home.css';

const Home = props => {
  const loggedUser = useContext(AuthenticationContext).loggedUser;
  const postToFeed = (cache, post) => {
    const variables 
    = {
      first: 5,
      logged: loggedUser && loggedUser.id
    };
    const data = cache.readQuery({ query: INIT_FEED_QUERY, variables });
    data.feed.posts.unshift(post);
    cache.writeQuery({ query: INIT_FEED_QUERY, data, variables });
  };

  document.title = 'Twoot | Home';

  return (
    <div className="home">
      {loggedUser && <CreatePost update={postToFeed} />}
      <Query
        query={INIT_FEED_QUERY}
        variables={{
          first: FEED_PAGINATION,
          logged: loggedUser && loggedUser.id
        }}
        notifyOnNetworkStatusChange={true}
      >
        {({ data: { feed }, loading, fetchMore }) => {
          const posts = feed && feed.posts;
          return (
            <PostList
              loading={loading}
              posts={posts}
              onLoadMore={() => {
                if (!feed) return;
                return fetchMore({
                  query: MORE_FEED_QUERY,
                  variables: {
                    first: FEED_PAGINATION,
                    after: feed.cursor,
                    logged: loggedUser && loggedUser.id
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    return {
                      feed: {
                        cursor: fetchMoreResult.feed.cursor,
                        posts: [
                          ...previousResult.feed.posts,
                          ...fetchMoreResult.feed.posts
                        ],
                        __typename: 'Feed'
                      }
                    };
                  }
                });
              }}
            />
          );
        }}
      </Query>
    </div>
  );
};

export default Home;
