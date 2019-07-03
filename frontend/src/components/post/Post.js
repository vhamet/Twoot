import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';

import PostCommentsLink from 'components/post/PostCommentsLink';
import CreateComment from 'components/comment/CreateComment';
import CommentList from 'components/comment/CommentList';
import Avatar from 'components/avatar/Avatar';
import TimeSince from 'components/form/TimeSince';
import DropDown from 'components/form/DropDown';

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
    postedBy: { id: postById, username, avatar },
    comments,
    count
  } = props.post;

  const [displayComments, setDisplayComments] = useState(true);
  const [cursor, setCursor] = useState(comments.length ? comments[0].id : '');

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

  return (
    <ApolloConsumer>
      {client => (
        <>
          <div className="post__container">
            <div className="post-info__container">
              <Avatar id={postById} size="2.5rem" src={avatar} />
              <div>
                <Link className="profile-link" to={`/profile/${postById}`}>
                  {username}
                </Link>
                <TimeSince timespan={timespan} date={date} />
              </div>
              {props.loggedUser && props.loggedUser.id === postById && (
                <DropDown menu={<div>•••</div>}>
                  <ul className="post__dropdownmenu">
                    <li>
                      <label>✎ Update post</label>
                    </li>
                    <li>
                      <label>⌦ Delete post</label>
                    </li>
                  </ul>
                </DropDown>
              )}
            </div>
            <div className="post__content">
              <pre>{content}</pre>
            </div>
            {comments.length > 0 && (
              <PostCommentsLink
                count={count}
                comments={comments}
                onClick={() => setDisplayComments(!displayComments)}
              />
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
              <CommentList
                loggedUserId={props.loggedUser && props.loggedUser.id}
                postById={postById}
                comments={comments}
              />
              {props.loggedUser && <CreateComment postId={postId} avatar={props.loggedUser.avatar} />}
            </div>
          )}
        </>
      )}
    </ApolloConsumer>
  );
};

export default Post;
