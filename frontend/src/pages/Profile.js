import React from 'react';
import { Query, ApolloConsumer } from 'react-apollo';

import { LOGGED_USER } from 'apollo/queries';

const Profile = props => {
  return (
    <ApolloConsumer>
      {client => (
        <>
          <Query query={LOGGED_USER}>
            {({ data }) => <div>{data.isLoggedIn}</div>}
          </Query>
          <button
            onClick={() => {
              client.writeData({
                data: {
                  loggedUser: {
                    username: 'valelujah',
                    __typename: 'User'
                  }
                }
              });
            }}
          >
            loggeduser
          </button>
        </>
      )}
    </ApolloConsumer>
  );
};

export default Profile;
