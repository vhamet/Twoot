import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import AuthenticationContext from 'context/AuthenticationContext';

import 'styles/css/searchbar.css';

const SearchBar = props => {
  const loggedUser = useContext(AuthenticationContext).loggedUser;
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [visible, setVisible] = useState(false);
  const cachedUsers = useRef([]);

  useEffect(() => {
    if (loggedUser && loggedUser.following) {
      cachedUsers.current = loggedUser.following
        .concat(loggedUser.followers)
        .reduce(
          (acc, curr) =>
            acc.some(user => user.id === curr.id) ? acc : [...acc, curr],
          []
        );
    }
  }, [loggedUser]);

  useEffect(() => {
    const searchUsers = () =>
      cachedUsers.current.reduce((acc, curr) => {
        const index = curr.username.indexOf(search);
        return index >= 0 ? [...acc, { user: curr, index }] : acc;
      }, []);

    setSearchResult(searchUsers());
  }, [search]);

  useEffect(() => () => document.removeEventListener('click', removeFocus));

  const removeFocus = e => {
    if (!e.target.closest('searchbar')) {
      document.removeEventListener('click', removeFocus);
      setVisible(false);
    }
  };

  const handleClick = () => {
    setVisible(true);
    document.addEventListener('click', removeFocus);
  };

  return (
    <>
      <input
        type="text"
        className="searchbar"
        placeholder="Search..."
        onChange={e => setSearch(e.target.value)}
        onClick={handleClick}
      />
      {visible && search && (
        <div className="search-result__container">
          {searchResult.map(({ user, index }) => (
            <div className="search-result" key={user.id} onClick={props.onclickResult}>
              <Link to={`/profile/${user.id}`}>
                {user.username.slice(0, index)}
                <b>{user.username.slice(index, index + search.length)}</b>
                {user.username.slice(index + search.length)}
              </Link>
            </div>
          ))}
          <div className="search-result" onClick={props.onclickResult}>
            See all results for <b>{search}</b>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
