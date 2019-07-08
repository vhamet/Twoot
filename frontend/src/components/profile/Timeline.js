import React, { useContext } from 'react';
import { Query } from 'react-apollo';

import CreatePost from 'components/post/CreatePost';
import PostList from 'components/post/PostList';

import AuthenticationContext from 'context/AuthenticationContext';

import { FEED_PAGINATION } from 'constants.js';
import { INIT_TIMELINE_QUERY, MORE_TIMELINE_QUERY } from 'apollo/queries';

const Timeline = ({ userId, username }) => {
  const loggedUser = useContext(AuthenticationContext).loggedUser;
  const postToTimeline = (cache, post) => {
    const variables = {
      first: 5,
      logged: loggedUser && loggedUser.id,
      user: userId
    };
    const data = cache.readQuery({ query: INIT_TIMELINE_QUERY, variables });
    data.timeline.posts.unshift(post);
    cache.writeQuery({ query: INIT_TIMELINE_QUERY, data, variables });
  };

  return (
    <div className="timeline__container">
      {loggedUser &&
        ((loggedUser.id === userId && <CreatePost update={postToTimeline} />) ||
          (loggedUser.following.some(user => user.id === userId) && (
            <CreatePost
              update={postToTimeline}
              title={`Write on ${username}'s timeline`}
              postedOn={userId}
            />
          )))}
      <Query
        query={INIT_TIMELINE_QUERY}
        variables={{
          user: userId,
          first: FEED_PAGINATION,
          logged: loggedUser && loggedUser.id
        }}
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
                  variables: {
                    user: userId,
                    first: FEED_PAGINATION,
                    after: timeline.cursor,
                    logged: loggedUser && loggedUser.id
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult.timeline.posts.length)
                      return previousResult;
                    return {
                      timeline: {
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
  );
};

export default Timeline;
