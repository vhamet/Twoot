import React, { useState, useEffect, useRef } from 'react';
import { Mutation } from 'react-apollo';
import {
  CREATECOMMENT_MUTATION,
  GETPOST_FRAGMENT as fragment
} from 'apollo/queries';

import Avatar from 'components/avatar/Avatar';

import 'styles/css/comment.css';

const CreateComment = props => {
  const [content, setContent] = useState('');
  const inputRef = useRef(null);

  const handleError = err => {
    alert(err.graphQLErrors[0].message);
  };

  useEffect(() => {
    if (props.focus) {
      inputRef.current.focus();
      props.unFocus();
    }
  });

  return (
    <div className="create-comment__container">
      <Avatar size="2.2rem" src={props.avatar} />
      <Mutation
        mutation={CREATECOMMENT_MUTATION}
        variables={{ content, postId: props.postId }}
        onError={err => handleError(err)}
        onCompleted={() => {
          setContent('');
        }}
        update={(cache, { data: { createComment } }) => {
          const id = `Post:${createComment.postedOn.id}`;
          const post = cache.readFragment({ fragment, id });
          const data = {
            ...post,
            fetchedComments: {
              ...post.fetchedComments,
              count: post.fetchedComments.count + 1,
              comments: [...post.fetchedComments.comments, createComment]
            }
          };

          cache.writeFragment({ fragment, id, data });
        }}
      >
        {mutation => (
          <form
            onSubmit={e => {
              e.preventDefault();
              if (content) mutation();
            }}
          >
            <input
              className="create-comment__input"
              type="text"
              placeholder="Write a comment..."
              value={content}
              onChange={e => setContent(e.target.value)}
              ref={inputRef}
            />
          </form>
        )}
      </Mutation>
    </div>
  );
};

export default CreateComment;
