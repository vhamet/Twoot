import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import Avatar from 'components/avatar/Avatar';
import TimeSince from 'components/form/TimeSince';
import DropDown from 'components/form/DropDown';
import CommentLikes from 'components/comment/CommentLikes';

import AuthenticationContext from 'context/AuthenticationContext';
import {
  LIKE_COMMENT_MUTATION,
  UNLIKE_COMMENT_MUTATION,
  UPDATE_LIKES_COMMENT_FRAGMENT as fragment
} from 'apollo/queries';

import 'styles/css/comment.css';

const Comment = props => {
  const {
    id: commentId,
    content,
    postedBy: { id: commentById, username, avatar },
    date,
    timespan,
    likes
  } = props.comment;
  const loggedUser = useContext(AuthenticationContext).loggedUser;

  return (
    <div className="comment__container">
      <Avatar size="2.2rem" id={commentById} src={avatar} />
      <div className="comment__layout">
        <div className="comment__content">
          <Link className="profile-link" to={`/profile/${commentById}`}>
            {username}
          </Link>
          {content}
          {likes.length > 0 && <CommentLikes likes={likes} />}
        </div>
        <div className="comment-actions">
          {loggedUser && (
            <>
              {likes.some(user => user.id === loggedUser.id) ? (
                <Mutation
                  mutation={UNLIKE_COMMENT_MUTATION}
                  variables={{ commentId }}
                  update={(cache, { data: { unlikePost } }) => {
                    const id = `Comment:${commentId}`;
                    const comment = cache.readFragment({ fragment, id });
                    const data = {
                      ...comment,
                      likes: comment.likes.filter(
                        user => user.id !== loggedUser.id
                      )
                    };

                    cache.writeFragment({ fragment, id, data });
                  }}
                >
                  {mutation => (
                    <label
                      className="comment-like__link liked"
                      onClick={mutation}
                    >
                      Like
                    </label>
                  )}
                </Mutation>
              ) : (
                <Mutation
                  mutation={LIKE_COMMENT_MUTATION}
                  variables={{ commentId }}
                  update={(cache, { data: { likeComment } }) => {
                    const id = `Comment:${commentId}`;
                    const comment = cache.readFragment({ fragment, id });
                    const data = {
                      ...comment,
                      likes: [...comment.likes, loggedUser]
                    };

                    cache.writeFragment({ fragment, id, data });
                  }}
                >
                  {mutation => (
                    <label className="comment-like__link" onClick={mutation}>
                      Like
                    </label>
                  )}
                </Mutation>
              )}
              <label className="comment-actions-separator">·</label>
            </>
          )}
          <TimeSince timespan={timespan} date={date} />
        </div>
      </div>
      {loggedUser === commentById && (
        <DropDown menu={<div>•••</div>}>
          <ul className="comment__dropdownmenu">
            <li>
              <label>✎ Update comment</label>
            </li>
            <li>
              <label>⌦ Delete comment</label>
            </li>
          </ul>
        </DropDown>
      )}
    </div>
  );
};

export default Comment;
