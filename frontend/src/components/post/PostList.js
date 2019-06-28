import React, { Component } from 'react';

import Spinner from 'components/loaders/Spinner';
import Loader from 'components/loaders/Loader';
import Post from 'components/post/Post';
import CreateComment from 'components/comment/CreateComment';
import CommentList from 'components/comment/CommentList';

import { timeDifferenceForDate } from 'utils';

class PostList extends Component {
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
    return (
      <>
        {this.props.posts &&
          this.props.posts.map(post => (
            <React.Fragment key={post.id}>
              <Post
                post={{
                  ...post,
                  timespan: timeDifferenceForDate(post.createdAt)
                }}
              />
              <div className="comments__container">
                <CreateComment postId={post.id} />
                <CommentList comments={post.comments} />
              </div>
            </React.Fragment>
          ))}
        {this.props.loading && <Loader />}
      </>
    );
  }
}

export default PostList;
