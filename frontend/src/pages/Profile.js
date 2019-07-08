import React, { useState, useEffect, useContext } from 'react';
import { Query } from 'react-apollo';

import Timeline from 'components/profile/Timeline';
import About from 'components/profile/About';
import UserList from 'components/profile/UserList';
import FollowButton from 'components/form/FollowButton';
import Avatar from 'components/avatar/Avatar';
import Spinner from 'components/loaders/Spinner';

import AuthenticationContext from 'context/AuthenticationContext';
import { USER_QUERY } from 'apollo/queries';
import cover from 'images/cover.jpg';

import 'styles/css/profile.css';

const Profile = props => {
  const context = useContext(AuthenticationContext);
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setUserId(props.match.params.userId);
    setPage(0);
  }, [props.match.params]);

  if (!userId) return <Spinner />;

  return (
    <div className="profile__container">
      <Query query={USER_QUERY} variables={{ id: userId }}>
        {({ data: { user }, loading }) => {
          if (loading) return <Spinner />;
          document.title = `Twoot | ${user.username}`;
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
                      Following{' '}
                      <label className="number">
                        {user.following.length || ''}
                      </label>
                    </li>
                    <li
                      className={page === 3 ? 'active' : ''}
                      onClick={() => setPage(3)}
                    >
                      Followers{' '}
                      <label className="number">
                        {user.followers.length || ''}
                      </label>
                    </li>
                  </ul>
                  <div className="profile-avatar">
                    <Avatar size="10rem" src={user.avatar} />
                  </div>
                  <label className="profile-username__label">
                    {user.username}
                  </label>
                  {context.loggedUser && context.loggedUser.id !== user.id && (
                    <FollowButton user={user} />
                  )}
                </div>
                {page === 0 && <Timeline userId={user.id} username={user.username} />}
                {page === 1 && <About user={user} />}
                {page === 2 && (
                  <UserList title="Following" users={user.following} />
                )}
                {page === 3 && (
                  <UserList title="Followers" users={user.followers} />
                )}
              </>
            )
          );
        }}
      </Query>
    </div>
  );
};

export default Profile;
