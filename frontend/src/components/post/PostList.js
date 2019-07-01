import React, { Component } from 'react';

import Spinner from 'components/loaders/Spinner';
import Loader from 'components/loaders/Loader';
import Post from 'components/post/Post';
import CreateComment from 'components/comment/CreateComment';
import CommentList from 'components/comment/CommentList';

import AuthenticationContext from 'context/AuthenticationContext';
import { timeDifferenceForDate, formattedDate } from 'utils';

class PostList extends Component {
  static contextType = AuthenticationContext;

  addScrollDownListener = () =>
    window.addEventListener('scroll', this.handleOnScroll);
  clearScrollDownListener = () =>
    window.removeEventListener('scroll', this.handleOnScroll);

  componentDidMount() {
    this.addScrollDownListener();
  }

  componentDidUpdate() {
    if (!this.props.loading) {
      this.addScrollDownListener();
    }
  }

  componentWillUnmount() {
    this.clearScrollDownListener();
  }

  handleOnScroll = () => {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      this.clearScrollDownListener();
      this.props.onLoadMore();
    }
  };

  render() {
    if (!this.props.posts && this.props.loading) return <Spinner />;

    const userid = this.context.loggedUser && this.context.loggedUser.id;
    return (
      <>
        {this.props.posts &&
          this.props.posts.map(post => (
            <React.Fragment key={post.id}>
              <Post
                userId={userid}
                post={{
                  ...post,
                  timespan: timeDifferenceForDate(post.createdAt),
                  date: formattedDate(post.createdAt)
                }}
              />
              <div className="comments__container">
                {userid && <CreateComment postId={post.id} />}
                <CommentList
                  userId={userid}
                  comments={post.comments.map(comment => ({
                    ...comment,
                    timespan: timeDifferenceForDate(comment.createdAt),
                    date: formattedDate(comment.createdAt)
                  }))}
                />
              </div>
            </React.Fragment>
          ))}
        {this.props.loading && <Loader />}
      </>
    );
  }
}

export default PostList;
