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
        likes {
          id
          username
        }
      }
      count
    }
    likes {
      id
      username
    }
    postedOn {
      id
      username
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
        likes {
          id
        }
      }
      count
    }
  }
`;

export const POST_QUERY = gql`
  query PostQUery($id: ID!) {
    post(id: $id) {
      ...PostContent
    }
  }
  ${POST_CONTENT_FRAGMENT}
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
      likes {
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
  mutation CreatePostMutation(
    $content: String!
    $isPrivate: Boolean!
    $postedOn: ID
  ) {
    createPost(content: $content, isPrivate: $isPrivate, postedOn: $postedOn) {
      ...PostContent
    }
  }
  ${POST_CONTENT_FRAGMENT}
`;

export const CREATECOMMENT_MUTATION = gql`
  mutation CreateCommentMutation(
    $postId: ID!
    $postById: ID!
    $content: String!
  ) {
    createComment(postId: $postId, postById: $postById, content: $content) {
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
      likes {
        id
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

export const LIKE_POST_MUTATION = gql`
  mutation LikePostMutation($postId: ID!) {
    likePost(postId: $postId)
  }
`;

export const UNLIKE_POST_MUTATION = gql`
  mutation UnikePostMutation($postId: ID!) {
    unlikePost(postId: $postId)
  }
`;

export const UPDATE_LIKES_POST_FRAGMENT = gql`
  fragment updateLikesPost on Post {
    id
    likes {
      id
    }
  }
`;

export const LIKE_COMMENT_MUTATION = gql`
  mutation LikeCommentMutation($commentId: ID!) {
    likeComment(commentId: $commentId)
  }
`;

export const UNLIKE_COMMENT_MUTATION = gql`
  mutation UnikeCommentMutation($commentId: ID!) {
    unlikeComment(commentId: $commentId)
  }
`;

export const UPDATE_LIKES_COMMENT_FRAGMENT = gql`
  fragment updateLikesComment on Comment {
    id
    likes {
      id
    }
  }
`;

const ALERT_CONTENT_FRAGMENT = gql`
  fragment AlertContent on Alert {
    id
    seen
    createdAt
    onComment {
      id
      postedBy {
        id
        username
        avatar
      }
      postedOn {
        id
      }
    }
    onPost {
      id
      postedBy {
        id
        username
        avatar
      }
    }
    onFollower {
      id
      username
      avatar
    }
  }
`;

export const INIT_ALERT_QUERY = gql`
  query InitAlertQuery($first: Int) {
    alerts(first: $first) {
      ...AlertContent
    }
  }
  ${ALERT_CONTENT_FRAGMENT}
`;

export const NEW_ALERT_SUBSCRIPTION = gql`
  subscription {
    newAlert {
      ...AlertContent
    }
  }
  ${ALERT_CONTENT_FRAGMENT}
`;

export const UPDATE_READ_ALERT_MUTATION = gql`
  mutation UpdateReadAlertMutation($alertId: ID!, $seen: Boolean) {
    updateReadAlert(alertId: $alertId, seen: $seen)
  }
`;

export const UPDATE_ALERT_FRAGMENT = gql`
  fragment updateAlert on Alert {
    id
    seen
  }
`;
