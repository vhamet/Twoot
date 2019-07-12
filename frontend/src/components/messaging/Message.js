import React, { useContext } from 'react';

import Avatar from 'components/avatar/Avatar';

import AuthenticationContext from 'context/AuthenticationContext';

const Message = ({ message }) => {
  const loggedUser = useContext(AuthenticationContext).loggedUser;
  const userMessage = loggedUser.id === message.from.id;

  return (
    <div
      className={`message__container${
        userMessage ? ' right' : ''
      }`}
    >
      {!userMessage && (
        <Avatar src={message.from.avatar} size="1.5rem" />
      )}
      <div
        className={
          userMessage ? 'message-from' : 'message-to'
        }
      >
        {message.content}
      </div>
    </div>
  );
};

export default Message;
