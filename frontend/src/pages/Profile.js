import React, { useState, useEffect } from 'react';
import { Query } from 'react-apollo';

import Timeline from 'components/profile/Timeline';
import About from 'components/profile/About';
import Friends from 'components/profile/Friends';
import Avatar from 'components/avatar/Avatar';
import Spinner from 'components/loaders/Spinner';

import { USER_QUERY } from 'apollo/queries';
import cover from 'images/cover.jpg';

import 'styles/css/profile.css';

const Profile = props => {
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setUserId(props.match.params.userId);
  }, [props.match.params]);

  if (!userId) return <Spinner />;
  return (
    <div className="profile__container">
      <Query query={USER_QUERY} variables={{ id: userId }}>
        {({ data: { user }, loading, fetchMore }) => {
          if (loading) return <Spinner />;

          return (
            user && (
              <>
                <div className="profile__header">
                  <div className="profile-cover">
                    <img src={cover} alt="cover" />
                  </div>
                  <ul>
                    <li className={page === 0 ? 'active' : ''} onClick={() => setPage(0)}>Timeline</li>
                    <li className={page === 1 ? 'active' : ''} onClick={() => setPage(1)}>About</li>
                    <li className={page === 2 ? 'active' : ''} onClick={() => setPage(2)}>Friends</li>
                  </ul>
                  <div className="profile-avatar">
                    <Avatar size="10rem" />
                  </div>
                  <label className="profile-username__label">
                    {user.username}
                  </label>
                </div>
                {page === 0 && <Timeline  userId={user.id}/>}
                {page === 1 && <About user={user} />}
                {page === 2 && <Friends friends={user.friends}/>}
              </>
            )
          );
        }}
      </Query>
    </div>
  );
};

export default Profile;
