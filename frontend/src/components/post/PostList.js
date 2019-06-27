import React, { Component, Fragment } from 'react';

import Spinner from 'components/loaders/Spinner';
import Loader from 'components/loaders/Loader';
import Post from 'components/post/Post';

import { timeDifferenceForDate } from 'utils';

class PostList extends Component {
  addScrollDownListener = () =>
    window.addEventListener('scroll', this.handleOnScroll);
  clearScrollDownListener = () =>
    window.removeEventListener('scroll', this.handleOnScroll);

  componentDidMount() {
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
      <Fragment>
        {this.props.posts.map(post => (
          <Post key={post.id} post={{...post, date: timeDifferenceForDate(post.createdAt) }} />
        ))}
        {this.props.loading && <Loader />}
      </Fragment>
    );
  }
}

export default PostList;
