import React, { useState, useEffect, useContext } from 'react';
import { Query } from 'react-apollo';

import Post from 'components/post/Post';
import Spinner from 'components/loaders/Spinner';

import AuthenticationContext from 'context/AuthenticationContext';
import { timeDifferenceForDate, formattedDate } from 'utils';
import { POST_QUERY } from 'apollo/queries';

import 'styles/css/consultPost.css';
import 'styles/css/post.css';

const ConsultPost = props => {
  const loggedUser = useContext(AuthenticationContext).loggedUser;
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    setPostId(props.match.params.postId);
  }, [props.match.params]);

  if (!postId) return <Spinner />;

  return (
    <div className="consult-post__container">
      <Query query={POST_QUERY} variables={{ id: postId }}>
        {({ data: { post }, loading }) => {
          if (loading) return <Spinner />;

          return (
            <Post
              loggedUser={loggedUser}
              post={{
                ...post,
                timespan: timeDifferenceForDate(post.createdAt),
                date: formattedDate(post.createdAt),
                count: post.fetchedComments.count,
                comments: post.fetchedComments.comments.map(comment => ({
                  ...comment,
                  timespan: timeDifferenceForDate(comment.createdAt),
                  date: formattedDate(comment.createdAt)
                }))
              }}
            />
          );
        }}
      </Query>
    </div>
  );
};

export default ConsultPost;
