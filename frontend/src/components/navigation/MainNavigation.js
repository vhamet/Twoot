import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Query, ApolloConsumer } from 'react-apollo';

import AuthenticationContext from 'context/AuthenticationContext';

import DropDown from 'components/form/DropDown';
import Avatar from 'components/avatar/Avatar';
import { LOGGED_USER } from 'apollo/queries';

import 'Styles/css/mainNavigation.css';

const MainNavigation = props => (
  <AuthenticationContext.Consumer>
    {context => {
      return (
        <ApolloConsumer>
          {client => (
            <header className="main-navigation__header">
              <div className="main-navigation__container">
                <div className="main-navigation__logo">
                  <Link to="/home">
                    <h1>Twoot</h1>
                  </Link>
                </div>
                <nav className="main-navigation__items">
                  {context.token ? (
                    <ul>
                      {context.loggedUserFetched && (
                        <Query query={LOGGED_USER}>
                          {({ data }) => (
                            <DropDown
                              menu={
                                <li className="main-navigation__item main-navigation__linkmenu">
                                  <label>
                                    <Avatar size="1.3rem" />
                                    {data.loggedUser.username}
                                  </label>
                                </li>
                              }
                            >
                              <ul className="main-navigation__dropdownmenu">
                                <li>
                                  <Link to="/profile">Profile</Link>
                                </li>
                                <li onClick={context.logout}>
                                  <label>Log Out</label>
                                </li>
                              </ul>
                            </DropDown>
                          )}
                        </Query>
                      )}
                      <div className="separator" />
                      <li className="main-navigation__item">
                        <Link to="/home">Home</Link>
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li className="main-navigation__item">
                        <Link to="/login">Login</Link>
                      </li>
                      <li className="main-navigation__item">
                        <Link to="/signup">Signup</Link>
                      </li>
                    </ul>
                  )}
                </nav>
              </div>
            </header>
          )}
        </ApolloConsumer>
      );
    }}
  </AuthenticationContext.Consumer>
);

export default withRouter(MainNavigation);
