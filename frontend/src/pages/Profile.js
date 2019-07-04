import React, { useState, useEffect, useContext } from 'react';
import { Query, Mutation } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserSlash } from '@fortawesome/free-solid-svg-icons';

import Timeline from 'components/profile/Timeline';
import About from 'components/profile/About';
import UserList from 'components/profile/UserList';
import Avatar from 'components/avatar/Avatar';
import Spinner from 'components/loaders/Spinner';

import AuthenticationContext from 'context/AuthenticationContext';
import {
  USER_QUERY,
  FOLLOW_MUTATION,
  UNFOLLOW_MUTATION,
  UPDATE_FOLLOW_FRAGMENT as fragment
} from 'apollo/queries';
import cover from 'images/cover.jpg';

import 'styles/css/profile.css';

const Profile = props => {
  const context = useContext(AuthenticationContext);
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setUserId(props.match.params.userId);
  }, [props.match.params]);

  if (!userId) return <Spinner />;

  const loggedUser = context.loggedUser;
  return (
    <div className="profile__container">
      <Query query={USER_QUERY} variables={{ id: userId }}>
        {({ data: { user }, loading }) => {
          if (loading) return <Spinner />;
          return (
            user && (
              <>
                <div className="profile__header">
                  <div className="profile-cover">
                    <img src={cover} alt="cover" />
                  </div>
                  <ul>
                    <li
                      className={page === 0 ? 'active' : ''}
                      onClick={() => setPage(0)}
                    >
                      Timeline
                    </li>
                    <li
                      className={page === 1 ? 'active' : ''}
                      onClick={() => setPage(1)}
                    >
                      About
                    </li>
                    <li
                      className={page === 2 ? 'active' : ''}
                      onClick={() => setPage(2)}
                    >
                      Following
                    </li>
                    <li
                      className={page === 3 ? 'active' : ''}
                      onClick={() => setPage(3)}
                    >
                      Followers
                    </li>
                  </ul>
                  <div className="profile-avatar">
                    <Avatar size="10rem" src={user.avatar} />
                  </div>
                  <label className="profile-username__label">
                    {user.username}
                  </label>
                  {loggedUser &&
                    loggedUser.id !== user.id &&
                    (loggedUser.following.some(
                      follow => follow.id === user.id
                    ) ? (
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
                          <button
                            className="profile-follow__button"
                            onClick={mutation}
                          >
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
                          context.loggedUser.following = [
                            ...context.loggedUser.following,
                            user
                          ];

                          const followingId = `User:${user.id}`;
                          const updateFollowerUser = cache.readFragment({
                            fragment,
                            id: followingId
                          });
                          const dataFollower = {
                            ...updateFollowerUser,
                            followers: [
                              ...updateFollowerUser.followers,
                              loggedUser
                            ]
                          };
                          cache.writeFragment({
                            fragment,
                            id: followingId,
                            data: dataFollower
                          });
                        }}
                      >
                        {mutation => (
                          <button
                            className="profile-follow__button"
                            onClick={mutation}
                          >
                            <FontAwesomeIcon icon={faUserPlus} />
                            Follow
                          </button>
                        )}
                      </Mutation>
                    ))}
                </div>
                {page === 0 && <Timeline userId={user.id} />}
                {page === 1 && <About user={user} />}
                {page === 2 && <UserList title="Following" users={user.following} />}
                {page === 3 && <UserList title="Followers" users={user.followers} />}
              </>
            )
          );
        }}
      </Query>
    </div>
  );
};

export default Profile;
