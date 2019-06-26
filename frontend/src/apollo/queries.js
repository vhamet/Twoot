import gql from 'graphql-tag';

export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: PostOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
      posts {
        id
        createdAt
        content
        postedBy {
          id
          username
        }
      }
      count
    }
  }
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
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
        id
      }
    }
  }
`;

export const LOGGED_USER = gql`
  query GetLoggedUser {
    loggedUser {
      id
      username
      email
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
