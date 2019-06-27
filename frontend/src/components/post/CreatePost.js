import React, { useState, memo } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import Avatar from 'components/avatar/Avatar';

import { CREATEPOST_MUTATION } from 'apollo/queries';

import 'styles/css/post.css';

const CreatePost = props => {
  const [content, setContent] = useState('');

  const handleChange = e => {
    setContent(e.target.value);
  };

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
          onChange={handleChange}
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
        update={(cache, { data: { createPost } }) =>
          props.newPost(cache, createPost)
        }
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

export default withRouter(memo(CreatePost));
