import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import AuthenticationContext from 'context/AuthenticationContext';

import 'Styles/css/mainNavigation.css';

const MainNavigation = props => (
  <AuthenticationContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <NavLink to="/home">
              <h1>Twoot</h1>
            </NavLink>
          </div>
          <nav className="main-navigation__items">
            <ul>
              {context.token ? (
                <button onClick={context.logout}>Logout</button>
              ) : (
                <Fragment>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup">Signup</NavLink>
                  </li>
                </Fragment>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthenticationContext.Consumer>
);

export default withRouter(MainNavigation);
