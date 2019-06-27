import React, { Component, memo } from 'react';

import Spinner from 'components/loaders/Spinner';
import Loader from 'components/loaders/Loader';
import Post from 'components/post/Post';

class PostList extends Component {
  addScrollDownListener = () =>
    window.addEventListener('scroll', this.handleOnScroll);
  clearScrollDownListener = () =>
    window.removeEventListener('scroll', this.handleOnScroll);

  componentDidMount() {
    this.props.loadFeed();
    this.addScrollDownListener();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.posts && prevProps.posts.length !== this.props.posts.length) {
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
      this.props.loadMore();
    }
  };

  render() {
    if (!this.props.posts && this.props.loading) return <Spinner />;
    return (
      <>
        {this.props.posts && this.props.posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
        {this.props.loading && <Loader />}
      </>
    );
  }
}

export default memo(PostList);
