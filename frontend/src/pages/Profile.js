import React from 'react';
import { Query } from 'react-apollo';

import { IS_LOGGED_IN } from 'apollo/queries';

const Profile = props => {
  return (
    <Query query={IS_LOGGED_IN}>
      {({ data }) =>
        data.isLoggedIn ? <div>{data.isLoggedIn}</div> : <div>NOT</div>
      }
    </Query>
  );
};

export default Profile;
