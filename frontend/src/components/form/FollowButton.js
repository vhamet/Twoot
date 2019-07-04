import React, { useContext } from 'react';
import { Mutation } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserSlash } from '@fortawesome/free-solid-svg-icons';

import AuthenticationContext from 'context/AuthenticationContext';
import {
  FOLLOW_MUTATION,
  UNFOLLOW_MUTATION,
  UPDATE_FOLLOW_FRAGMENT as fragment
} from 'apollo/queries';

import 'styles/css/followButton.css';

const FollowButton = ({ user }) => {
  const context = useContext(AuthenticationContext);
  const loggedUser = context.loggedUser;

  if (!loggedUser || loggedUser.id === user.id) return <></>;

  return loggedUser.following && 
    loggedUser.following.some(follow => follow.id === user.id) ? (
    <Mutation
      mutation={UNFOLLOW_MUTATION}
      variables={{ followId: user.id }}
      onError={err => this._handleError(err)}
      update={(cache, { data: { success } }) => {
        const followerId = `User:${loggedUser.id}`;
        const updateFollowingUser = cache.readFragment({
          fragment,
          id: followerId
        });
        const dataFollowing = {
          ...updateFollowingUser,
          following: updateFollowingUser.following.filter(
            follow => follow.id !== user.id
          )
        };
        cache.writeFragment({
          fragment,
          id: followerId,
          data: dataFollowing
        });
        context.loggedUser.following = context.loggedUser.following.filter(
          follow => follow.id !== user.id
        );

        const followingId = `User:${user.id}`;
        const updateFollowerUser = cache.readFragment({
          fragment,
          id: followingId
        });
        const dataFollower = {
          ...updateFollowerUser,
          followers: updateFollowerUser.followers.filter(
            follow => follow.id !== loggedUser.id
          )
        };
        cache.writeFragment({
          fragment,
          id: followingId,
          data: dataFollower
        });
      }}
    >
      {mutation => (
        <button className="follow__button" onClick={mutation}>
          <FontAwesomeIcon icon={faUserSlash} /> Unfollow
        </button>
      )}
    </Mutation>
  ) : (
    <Mutation
      mutation={FOLLOW_MUTATION}
      variables={{ followId: user.id }}
      onError={err => this._handleError(err)}
      update={(cache, { data: { success } }) => {
        const followerId = `User:${loggedUser.id}`;
        const updateFollowingUser = cache.readFragment({
          fragment,
          id: followerId
        });
        const dataFollowing = {
          ...updateFollowingUser,
          following: [...updateFollowingUser.following, user]
        };
        cache.writeFragment({
          fragment,
          id: followerId,
          data: dataFollowing
        });
        context.loggedUser.following = [...context.loggedUser.following, user];

        const followingId = `User:${user.id}`;
        const updateFollowerUser = cache.readFragment({
          fragment,
          id: followingId
        });
        const dataFollower = {
          ...updateFollowerUser,
          followers: [...updateFollowerUser.followers, loggedUser]
        };
        cache.writeFragment({
          fragment,
          id: followingId,
          data: dataFollower
        });
      }}
    >
      {mutation => (
        <button className="follow__button" onClick={mutation}>
          <FontAwesomeIcon icon={faUserPlus} />
          Follow
        </button>
      )}
    </Mutation>
  );
};

export default FollowButton;
