import React from 'react';
import { Query } from 'react-apollo';

import CreatePost from 'components/post/CreatePost';
import PostList from 'components/post/PostList';

import AuthenticationContext from 'context/AuthenticationContext';

import { FEED_PAGINATION } from 'constants.js';
import { INIT_FEED_QUERY, MORE_FEED_QUERY } from 'apollo/queries';
import 'styles/css/home.css';

const Home = props => {
  document.title = 'Twoot | Home';
  return (
    <AuthenticationContext.Consumer>
      {context => (
        <div className="home">
          {context.loggedUser && (
            <CreatePost avatar={context.loggedUser.avatar} />
          )}
          <Query
            query={INIT_FEED_QUERY}
            variables={{ first: FEED_PAGINATION }}
            notifyOnNetworkStatusChange={true}
          >
            {({ data: { feed }, loading, fetchMore }) => {
              const posts = feed && feed.posts;
              return (
                <PostList
                  loading={loading}
                  posts={posts}
                  onLoadMore={() =>
                    fetchMore({
                      query: MORE_FEED_QUERY,
                      variables: { first: FEED_PAGINATION, after: feed.cursor },
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
                    })
                  }
                />
              );
            }}
          </Query>
        </div>
      )}
    </AuthenticationContext.Consumer>
  );
};

export default Home;
