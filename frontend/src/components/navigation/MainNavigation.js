import React, { Component } from 'react';
import { withRouter } from "react-router";
import { NavLink } from 'react-router-dom';

import { AUTH_TOKEN } from '../../constants';

import './MainNavigation.css';

class MainNavigation extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <header className="main-navigation">
        <div className="main-navigation__logo">
          <NavLink to="/">
            <h1>Twoot</h1>
          </NavLink>
        </div>
        <nav className="main-navigation__items">
          <ul>
            {authToken ? (
              <button onClick={() => { 
                localStorage.removeItem(AUTH_TOKEN);
                this.props.history.push(`/`);
              }}
              >
                Logout
              </button>
            ) : (
              <React.Fragment>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Signup</NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default withRouter(MainNavigation);
