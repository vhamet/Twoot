import React from 'react';
import { Query } from 'react-apollo';

import CreatePost from 'components/post/CreatePost';
import PostList from 'components/post/PostList';

import AuthenticationContext from 'context/AuthenticationContext';

import { FEED_PAGINATION } from 'constants.js';
import { INIT_TIMELINE_QUERY, MORE_TIMELINE_QUERY } from 'apollo/queries';

const Timeline = ({ userId }) => {
  return (
    <AuthenticationContext.Consumer>
      {context => (
        <div className="timeline">
          {context.token && <CreatePost />}
          <Query
            query={INIT_TIMELINE_QUERY}
            variables={{ user: userId, first: FEED_PAGINATION }}
            notifyOnNetworkStatusChange={true}
          >
            {({ data: { timeline }, loading, fetchMore }) => {
              const posts = timeline && timeline.posts;
              return (
                <PostList
                  loading={loading}
                  posts={posts}
                  onLoadMore={() =>
                    fetchMore({
                      query: MORE_TIMELINE_QUERY,
                      variables: { user: userId, first: FEED_PAGINATION, after: timeline.cursor },
                      updateQuery: (previousResult, { fetchMoreResult }) => {
                        return {
                          feed: {
                            cursor: fetchMoreResult.timeline.cursor,
                            posts: [
                              ...previousResult.timeline.posts,
                              ...fetchMoreResult.timeline.posts
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

export default Timeline;