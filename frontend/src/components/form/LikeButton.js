import React, { useContext } from 'react';
import { Mutation } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

import AuthenticationContext from 'context/AuthenticationContext';
import {
  LIKE_POST_MUTATION,
  UNLIKE_POST_MUTATION,
  UPDATE_LIKES_POST_FRAGMENT as fragment
} from 'apollo/queries';

const LikeButton = ({ postId, likes }) => {
  const loggedUser = useContext(AuthenticationContext).loggedUser;

  return likes.some(user => user.id === loggedUser.id) ? (
    <Mutation
      mutation={UNLIKE_POST_MUTATION}
      variables={{ postId: postId }}
      update={(cache, { data: { unlikePost } }) => {
        const id = `Post:${postId}`;
        const post = cache.readFragment({ fragment, id });
        const data = {
          ...post,
          likes: post.likes.filter(user => user.id !== loggedUser.id)
        };

        cache.writeFragment({ fragment, id, data });
      }}
    >
      {mutation => (
        <button onClick={mutation} className="liked">
          <FontAwesomeIcon icon={faThumbsUp} />
          Like
        </button>
      )}
    </Mutation>
  ) : (
    <Mutation
      mutation={LIKE_POST_MUTATION}
      variables={{ postId: postId }}
      update={(cache, { data: { likePost } }) => {
        const id = `Post:${postId}`;
        const post = cache.readFragment({ fragment, id });
        const data = {
          ...post,
          likes: [...post.likes, loggedUser]
        };

        cache.writeFragment({ fragment, id, data });
      }}
    >
      {mutation => (
        <button onClick={mutation}>
          <FontAwesomeIcon icon={faThumbsUp} />
          Like
        </button>
      )}
    </Mutation>
  );
};

export default LikeButton;
