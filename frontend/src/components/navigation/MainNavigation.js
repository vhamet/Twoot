import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import AuthenticationContext from 'context/AuthenticationContext';

import DropDown from 'components/form/DropDown';

import 'Styles/css/mainNavigation.css';

const MainNavigation = props => (
  <AuthenticationContext.Consumer>
    {context => {
      return (
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
                  <li className="main-navigation__item">
                    <Link to="/home">Home</Link>
                  </li>
                  <div className="separator" />
                  <DropDown
                    menu={
                      <li className="main-navigation__item">
                        <label>Menu</label>
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
      );
    }}
  </AuthenticationContext.Consumer>
);

export default withRouter(MainNavigation);
