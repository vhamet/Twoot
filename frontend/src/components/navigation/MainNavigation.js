import React, { memo } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import SearchBar from 'components/navigation/SearchBar';
import DropDown from 'components/form/DropDown';
import ToggleSwitch from 'components/form/ToggleSwitch';
import Avatar from 'components/avatar/Avatar';

import useDarkMode from 'useDarkMode';

import 'styles/css/mainNavigation.css';

const MainNavigation = ({ token, loggedUser, logout }) => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <header className="main-navigation__header">
      <div className="main-navigation__container">
        <div className="main-navigation__logo">
          <Link to="/home">
            <h1>Twoot</h1>
          </Link>
        </div>
        <SearchBar />
        <nav className="main-navigation__items">
          {token ? (
            <ul>
              {loggedUser && (
                <DropDown
                  menu={
                    <li className="main-navigation__item main-navigation__linkmenu">
                      <label>
                        <Avatar size="1.3rem" src={loggedUser.avatar} />
                        {loggedUser.username}
                      </label>
                    </li>
                  }
                >
                  <ul className="main-navigation__dropdownmenu">
                    <li>
                      <Link to={`/profile/${loggedUser.id}`}>Profile</Link>
                    </li>
                    <li className="dropdown_keep darkmode-switch_container">
                      <label>Dark mode</label> 
                      <ToggleSwitch
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                      />
                    </li>
                    <li onClick={logout}>
                      <label>Log Out</label>
                    </li>
                  </ul>
                </DropDown>
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
  );
};

export default withRouter(memo(MainNavigation));
