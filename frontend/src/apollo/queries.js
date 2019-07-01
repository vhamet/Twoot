import gql from 'graphql-tag';

const FEED_CONTENT_FRAGMENT = gql`
  fragment FeedContent on Feed {
    posts {
      id
      createdAt
      content
      postedBy {
        id
        username
      }
      comments {
        id
        content
        createdAt
        postedBy {
          id
          username
        }
      }
    }
    cursor
  }
`;

export const INIT_FEED_QUERY = gql`
  query InitFeedQuery($first: Int) {
    feed(first: $first) {
      ...FeedContent
    }
  }
  ${FEED_CONTENT_FRAGMENT}
`;

export const MORE_FEED_QUERY = gql`
  query MoreFeedQuery($first: Int, $after: ID) {
    feed(first: $first, after: $after) {
      ...FeedContent
    }
  }
  ${FEED_CONTENT_FRAGMENT}
`;

export const CREATEPOST_MUTATION = gql`
  mutation CreatePostMutation($content: String!) {
    createPost(content: $content) {
      id
      content
      createdAt
      postedBy {
        id
        username
      }
      comments {
        id
        content
        createdAt
        postedBy {
          id
          username
        }
      }
    }
  }
`;

export const CREATECOMMENT_MUTATION = gql`
  mutation CreateCommentMutation($postId: ID!, $content: String!) {
    createComment(postId: $postId, content: $content) {
      id
      content
      createdAt
      postedOn {
        id
      }
      postedBy {
        id
        username
      }
    }
  }
`;

export const GETPOST_FRAGMENT = gql`
  fragment getPost on Post {
    id
    comments {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $username: String!
  ) {
    signup(email: $email, password: $password, username: $username) {
      token
      user {
        id,
        username
      }
    }
  }
`;

export const USER_QUERY = gql`
  query UserQUery($id: ID!) {
    user(id: $id) {
      id
      username
      email
    }
  }
`;
