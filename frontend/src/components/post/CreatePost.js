import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

import { FEED_QUERY } from 'components/post/PostList';

import 'Styles/css/post.css';

const CREATEPOST_MUTATION = gql`
  mutation CreatePostMutation($content: String!) {
    createPost(content: $content) {
      id
      content
      createdAt
      postedBy {
        id
        username
      }
    }
  }
`;

class CreatePost extends Component {
  state = {
    content: ''
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.contentRef = React.createRef();
  }

  handleChange() {
    this.setState({ content: this.contentRef.current.value });
  }

  render() {
    const { content } = this.state;
    const first = 5;
    const skip = 0;
    const orderBy = 'createdAt_DESC';
    return (
      <ApolloConsumer>
        {client => (
          <div className="create-post__container">
            <div className="create-post__title">Create Post</div>
            <div className="create-post__content">
              <textarea
                ref={this.contentRef}
                onChange={this.handleChange}
                rows="4"
                placeholder="What's on your mind ?"
              />
            </div>
            <Mutation
              mutation={CREATEPOST_MUTATION}
              variables={{ content }}
              onError={err => this._handleError(err)}
              onCompleted={() => {
                this.contentRef.current.value = '';
                this.handleChange();
              }}
              update={(store, { data: { createPost } }) => {
                const data = store.readQuery({
                  query: FEED_QUERY,
                  variables: { first, skip, orderBy }
                });
                data.feed.posts.unshift(createPost);
                client.writeData({
                  query: FEED_QUERY,
                  data,
                  variables: { first, skip, orderBy }
                });
              }}
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
        )}
      </ApolloConsumer>
    );
  }

  _handleError = (err) => {
    alert(err.graphQLErrors[0].message)
  }
}

export default withRouter(CreatePost);
