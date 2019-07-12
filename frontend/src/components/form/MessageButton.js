import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import AuthenticationContext from 'context/AuthenticationContext';

import 'styles/css/actionButton.css';

const MessageButton = ({ user }) => {
  const context = useContext(AuthenticationContext);
  const loggedUser = context.loggedUser;

  if (!loggedUser || loggedUser.id === user.id) return <></>;

  const handleClick = () => {
    context.addConversation(user);
  }

  return (
  <button className="action__button message__button" onClick={handleClick}>
    <FontAwesomeIcon icon={faComments} />
    Message
  </button>
  );
};

export default MessageButton;
