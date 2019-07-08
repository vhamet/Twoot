import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';

import Avatar from 'components/avatar/Avatar';

import { CREATEPOST_MUTATION } from 'apollo/queries';
import AuthenticationContext from 'context/AuthenticationContext';

import 'styles/css/post.css';

const CreatePost = props => {
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const loggedUser = useContext(AuthenticationContext).loggedUser;

  const handleError = err => {
    alert(err.graphQLErrors[0].message);
  };

  return (
    <div className="create-post__container">
      <div className="create-post__title">{props.title || 'Create Post'}</div>
      <div className="create-post__content">
        <Avatar size="3rem" src={loggedUser.avatar} />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows="3"
          placeholder="What's on your mind ?"
        />
      </div>
      <div className="create-post-actions">
        <select
          className="privacy"
          onChange={e => setIsPrivate(!!e.target.value)}
        >
          <option value="">Public</option>
          <option value="1">Private</option>
        </select>
        <Mutation
          mutation={CREATEPOST_MUTATION}
          variables={{ content, isPrivate, postedOn: props.postedOn }}
          onError={err => handleError(err)}
          onCompleted={() => {
            setContent('');
          }}
          update={(cache, { data: { createPost } }) =>
            props.update(cache, createPost)
          }
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
