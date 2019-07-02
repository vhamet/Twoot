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
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setUserId(props.match.params.userId);
  }, [props.match.params.userId]);

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
                    <li onClick={() => setPage(0)}>Timeline</li>
                    <li onClick={() => setPage(1)}>About</li>
                    <li onClick={() => setPage(2)}>Friends</li>
                  </ul>
                  <div className="profile-avatar">
                    <Avatar size="10rem" />
                  </div>
                  <label className="profile-username__label">
                    {user.username}
                  </label>
                </div>
                {page === 0 && <Timeline  userId={user.id}/>}
                {page === 1 && <About />}
                {page === 2 && <Friends />}
              </>
            )
          );
        }}
      </Query>
    </div>
  );
};

export default Profile;
