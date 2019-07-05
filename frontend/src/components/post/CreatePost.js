import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import Avatar from 'components/avatar/Avatar';

import { CREATEPOST_MUTATION, INIT_FEED_QUERY } from 'apollo/queries';

import 'styles/css/post.css';

const CreatePost = props => {
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleError = err => {
    alert(err.graphQLErrors[0].message);
  };

  return (
    <div className="create-post__container">
      <div className="create-post__title">Create Post</div>
      <div className="create-post__content">
        <Avatar size="3rem" src={props.avatar} />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows="3"
          placeholder="What's on your mind ?"
        />
      </div>
      <div className="create-post-actions">
        <select className="privacy" onChange={e => setIsPrivate(!!e.target.value)}>
          <option value="">Public</option>
          <option value="1">Private</option>
        </select>
        <Mutation
          mutation={CREATEPOST_MUTATION}
          variables={{ content, isPrivate }}
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
            <button
              className="btn"
              disabled={!content.length}
              onClick={mutation}
            >
              Share
            </button>
          )}
        </Mutation>
      </div>
    </div>
  );
};

export default CreatePost;
