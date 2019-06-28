import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import Avatar from 'components/avatar/Avatar';

import { CREATEPOST_MUTATION, INIT_FEED_QUERY } from 'apollo/queries';

import 'styles/css/post.css';

const CreatePost = props => {
  const [content, setContent] = useState('');

  const handleError = err => {
    alert(err.graphQLErrors[0].message);
  };

  return (
    <div className="create-post__container">
      <div className="create-post__title">Create Post</div>
      <div className="create-post__content">
        <Avatar size="3rem" />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows="3"
          placeholder="What's on your mind ?"
        />
      </div>
      <Mutation
        mutation={CREATEPOST_MUTATION}
        variables={{ content }}
        onError={err => handleError(err)}
        onCompleted={() => {
          setContent('');
        }}
        update={(cache, { data: { createPost } }) => {
          const data = cache.readQuery({
            query: INIT_FEED_QUERY,
            variables: { first: 5 }
          });
          data.feed.posts.unshift(createPost);
          cache.writeQuery({
            query: INIT_FEED_QUERY,
            data,
            variables: { first: 5 }
          });
        }}
      >
        {mutation => (
          <button className="btn" disabled={!content.length} onClick={mutation}>
            Share
          </button>
        )}
      </Mutation>
    </div>
  );
};

export default withRouter(CreatePost);
