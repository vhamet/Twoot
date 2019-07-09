import React, { memo, useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import SearchBar from 'components/navigation/SearchBar';
import DropDown from 'components/form/DropDown';
import ToggleSwitch from 'components/form/ToggleSwitch';
import Avatar from 'components/avatar/Avatar';

import useDarkMode from 'useDarkMode';

import 'styles/css/mainNavigation.css';

const MainNavigation = ({ loggedUser, logout }) => {
  const [theme, toggleTheme] = useDarkMode();
  const [showNavigation, setShowNavigation] = useState(false);

  return (
    <header className="main-navigation__header">
      <nav className="main-navigation__items">
        <div className="main-navigation__logo">
          <Link to="/home">
            <h1>Twoot</h1>
          </Link>
        </div>
        <div className="searchbar">
          <SearchBar />
        </div>
        <div>
          {loggedUser && (
            <>
              <DropDown
                menu={
                  <div className="main-navigation__item main-navigation__linkmenu">
                    <Avatar size="1.3rem" src={loggedUser.avatar} />
                    <label>{loggedUser.username}</label>
                  </div>
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
              <div className="separator" />
            </>
          )}
          <div className="main-navigation__item">
            <Link to="/home">Home</Link>
          </div>
          {!loggedUser && (
            <>
              <div className="separator" />
              <div className="main-navigation__item">
                <Link to="/login">Login</Link>
              </div>
              <div className="separator" />
              <div className="main-navigation__item">
                <Link to="/signup">Signup</Link>
              </div>
            </>
          )}
        </div>
      </nav>
      <div className="navigation-mobile">
        <div>
          <div className="main-navigation__logo">
            <Link to="/home">
              <h1>Twoot</h1>
            </Link>
          </div>
          <div
            className="show-menu"
            onClick={() => setShowNavigation(!showNavigation)}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
        {showNavigation && (
          <>
            <div className="searchbar">
              <SearchBar />
            </div>
            <div className="main-navigation__item">
              <Link to="/home">Home</Link>
            </div>
            {loggedUser && (
              <>
                <div className="main-navigation__item">
                  <Link to={`/profile/${loggedUser.id}`}>Profile</Link>
                </div>
                <div className="main-navigation__item darkmode-switch_container">
                  <label>Dark mode</label>
                  <ToggleSwitch
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                  />
                </div>
                <div className="main-navigation__item" onClick={logout}>
                  <label>Log Out</label>
                </div>
              </>
            )}
            {!loggedUser && (
              <>
                <div className="main-navigation__item">
                  <Link to="/login">Login</Link>
                </div>
                <div className="main-navigation__item">
                  <Link to="/signup">Signup</Link>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default withRouter(memo(MainNavigation));
