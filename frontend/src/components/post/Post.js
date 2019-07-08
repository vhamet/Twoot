import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrashAlt,
  faUserLock
} from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';

import PostCommentsLink from 'components/post/PostCommentsLink';
import PostLikes from 'components/post/PostLikes';
import CreateComment from 'components/comment/CreateComment';
import CommentList from 'components/comment/CommentList';
import Avatar from 'components/avatar/Avatar';
import TimeSince from 'components/form/TimeSince';
import DropDown from 'components/form/DropDown';
import LikeButton from 'components/form/LikeButton';

import {
  MORE_COMMENTS_QUERY,
  GETPOST_FRAGMENT as fragment
} from 'apollo/queries';
import { COMMENTS_PAGINATION } from 'constants.js';

const Post = props => {
  const {
    id: postId,
    content,
    timespan,
    date,
    postedBy: { id: postById, username: byUsername, avatar },
    comments,
    count,
    likes
  } = props.post;
  let postOnId, onUsername;
  if (props.post.postedOn) {
    postOnId = props.post.postedOn.id;
    onUsername = props.post.postedOn.username;
  }

  const [displayComments, setDisplayComments] = useState(true);
  const [cursor, setCursor] = useState(comments.length ? comments[0].id : '');
  const [focusCreateComment, setFocusCreateComment] = useState(false);

  const loadMoreComments = async client => {
    const { data } = await client.query({
      query: MORE_COMMENTS_QUERY,
      variables: { postId, last: COMMENTS_PAGINATION, before: cursor }
    });

    const id = `Post:${postId}`;
    const post = client.readFragment({ fragment, id });
    const newPost = {
      ...post,
      fetchedComments: {
        ...post.fetchedComments,
        comments: [...data.moreComments, ...post.fetchedComments.comments]
      }
    };

    client.writeFragment({ fragment, id, data: newPost });
    setCursor(data.moreComments[0].id);
  };

  const unFocus = () => setFocusCreateComment(false);

  return (
    <ApolloConsumer>
      {client => (
        <>
          <div className="post__container">
            <div className="post-info__container">
              <Avatar id={postById} size="2.5rem" src={avatar} />
              <div>
                <div className="post-postedOn">
                  <Link className="profile-link" to={`/profile/${postById}`}>
                    {byUsername}
                  </Link>
                  {postOnId && (
                    <>
                      <label>►</label>
                      <Link
                        className="profile-link"
                        to={`/profile/${postOnId}`}
                      >
                        {onUsername}
                      </Link>
                    </>
                  )}
                </div>
                <TimeSince timespan={timespan} date={date} />
              </div>
              {props.loggedUser && props.loggedUser.id === postById && (
                <DropDown menu={<div>•••</div>}>
                  <ul className="post__dropdownmenu">
                    <li>
                      <FontAwesomeIcon icon={faUserLock} />
                      <label>Set privacy</label>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faPen} />
                      <label>Update post</label>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faTrashAlt} />
                      <label>Delete post</label>
                    </li>
                  </ul>
                </DropDown>
              )}
            </div>
            <div className="post__content">
              <pre>{content}</pre>
            </div>
            <div className="post-infos">
              {likes.length > 0 && <PostLikes likes={likes} />}
              {comments.length > 0 && (
                <PostCommentsLink
                  count={count}
                  comments={comments}
                  onClick={() => setDisplayComments(!displayComments)}
                />
              )}
            </div>
            {props.loggedUser && (
              <div className="post-actions__container">
                <LikeButton postId={postId} likes={likes} />
                <button
                  onClick={() => {
                    setDisplayComments(true);
                    setFocusCreateComment(true);
                  }}
                >
                  <FontAwesomeIcon icon={faCommentAlt} />
                  Comment
                </button>
              </div>
            )}
          </div>
          {displayComments && (comments.length || props.loggedUser) && (
            <div className="comments__container">
              {count > comments.length && (
                <div className="loadMoreComments">
                  <label onClick={() => loadMoreComments(client)}>
                    View more comments
                  </label>
                  <label>{`${comments.length} of ${count}`}</label>
                </div>
              )}
              <CommentList comments={comments} />
              {props.loggedUser && (
                <CreateComment
                  postId={postId}
                  avatar={props.loggedUser.avatar}
                  focus={focusCreateComment}
                  unFocus={unFocus}
                />
              )}
            </div>
          )}
        </>
      )}
    </ApolloConsumer>
  );
};

export default Post;
