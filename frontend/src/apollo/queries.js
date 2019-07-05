import gql from 'graphql-tag';

const POST_CONTENT_FRAGMENT = gql`
  fragment PostContent on Post {
    id
    createdAt
    content
    isPrivate
    postedBy {
      id
      username
      avatar
    }
    fetchedComments {
      comments {
        id
        content
        createdAt
        postedBy {
          id
          username
          avatar
        }
      }
      count
    }
  }
`;

const FEED_CONTENT_FRAGMENT = gql`
  fragment FeedContent on Feed {
    posts {
      ...PostContent
    }
    cursor
  }
  ${POST_CONTENT_FRAGMENT}
`;

export const INIT_FEED_QUERY = gql`
  query InitFeedQuery($first: Int, $logged: ID) {
    feed(first: $first, logged: $logged) {
      ...FeedContent
    }
  }
  ${FEED_CONTENT_FRAGMENT}
`;

export const MORE_FEED_QUERY = gql`
  query MoreFeedQuery($first: Int, $after: ID, $logged: ID) {
    feed(first: $first, after: $after, logged: $logged) {
      ...FeedContent
    }
  }
  ${FEED_CONTENT_FRAGMENT}
`;

export const INIT_TIMELINE_QUERY = gql`
  query InitTimelineQuery($user: ID, $first: Int, $logged: ID) {
    timeline(user: $user, first: $first, logged: $logged) {
      ...FeedContent
    }
  }
  ${FEED_CONTENT_FRAGMENT}
`;

export const MORE_TIMELINE_QUERY = gql`
  query MoreTimelineQuery($user: ID, $first: Int, $after: ID, $logged: ID) {
    timeline(user: $user, first: $first, after: $after, logged: $logged) {
      ...FeedContent
    }
  }
  ${FEED_CONTENT_FRAGMENT}
`;

export const GETPOST_FRAGMENT = gql`
  fragment getPost on Post {
    id
    fetchedComments {
      comments {
        id
      }
      count
    }
  }
`;

export const MORE_COMMENTS_QUERY = gql`
  query MoreCommentsQuery($postId: ID, $last: Int, $before: ID) {
    moreComments(postId: $postId, last: $last, before: $before) {
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

const USER_CONTENT_FRAGMENT = gql`
  fragment UserContent on User {
    id
    username
    email
    avatar
    following {
      id
      username
      email
      avatar
      following {
        id
      }
      followers {
        id
      }
    }
    followers {
      id
      username
      email
      avatar
      following {
        id
      }
      followers {
        id
      }
    }
  }
`;

export const USER_QUERY = gql`
  query UserQUery($id: ID!) {
    user(id: $id) {
      ...UserContent
    }
  }
  ${USER_CONTENT_FRAGMENT}
`;

export const CREATEPOST_MUTATION = gql`
  mutation CreatePostMutation($content: String!, $isPrivate: Boolean!) {
    createPost(content: $content, isPrivate: $isPrivate) {
      ...PostContent
    }
  }
  ${POST_CONTENT_FRAGMENT}
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

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      token
      user {
        ...UserContent
      }
    }
  }
  ${USER_CONTENT_FRAGMENT}
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
        ...UserContent
      }
    }
  }
  ${USER_CONTENT_FRAGMENT}
`;

export const FOLLOW_MUTATION = gql`
  mutation FollowMutation($followId: ID!) {
    follow(followId: $followId)
  }
`;

export const UNFOLLOW_MUTATION = gql`
  mutation UnfollowMutation($followId: ID!) {
    unfollow(followId: $followId)
  }
`;

export const UPDATE_FOLLOW_FRAGMENT = gql`
  fragment updateFollow on User {
    id
    following {
      id
    }
    followers {
      id
    }
  }
`;
