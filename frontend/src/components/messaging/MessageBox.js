import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

import Message from 'components/messaging/Message';
import Avatar from 'components/avatar/Avatar';
import Loader from 'components/loaders/Loader';

import AuthenticationContext from 'context/AuthenticationContext';
import { INIT_CONVERSATION_QUERY, SENDMESSAGE_MUTATION } from 'apollo/queries';

import 'styles/css/message.css';

const MessageBox = ({ user }) => {
  const context = useContext(AuthenticationContext);
  const [collapsed, setCollapsed] = useState(false);
  const [content, setContent] = useState('');
  const inputRef = useRef(null);

  const handleClick = () => {
    context.removeConversation(user);
  };

  return (
    <div className={`message-box__container${collapsed ? ' collapsed' : ''}`}>
      <div
        className="message-box__header"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Avatar src={user.avatar} size={collapsed ? '1.5rem' : '2rem'} />
        <Link to={`/profile/${user.id}`}>{user.username}</Link>
        <label onClick={handleClick}>✕</label>
      </div>

      <Query
        query={INIT_CONVERSATION_QUERY}
        variables={{ withUser: user.id, last: 5 }}
      >
        {({ loading, error, data, subscribeToMore }) => {
          return (
            <div className={`message-box__content${collapsed ? ' hide' : ''}`}>
              {(error && <div>Error</div>) ||
                (loading && (
                  <div className="loader">
                    <Loader />
                  </div>
                )) ||
                (!data.conversation.length && (
                  <div className="empty-message">No message to show</div>
                )) || (
                  <>
                    {data.conversation.map(message => (
                      <Message key={message.id} message={message} />
                    ))}
                  </>
                )}
            </div>
          );
        }}
      </Query>
      <div className={`message-box__input${collapsed ? ' hide' : ''}`}>
        <Mutation
          mutation={SENDMESSAGE_MUTATION}
          variables={{ content, toUser: user.id }}
          onError={err => alert(err.graphQLErrors[0].message)}
          onCompleted={() => {
            setContent('');
          }}
          update={(cache, { data: { sendMessage } }) => {
            const variables = { withUser: user.id, last: 5 };
            const data = cache.readQuery({ query: INIT_CONVERSATION_QUERY, variables });
            data.conversation.push(sendMessage);
            cache.writeQuery({ query: INIT_CONVERSATION_QUERY, data, variables });
          }}
        >
          {mutation => (
            <form
              onSubmit={e => {
                e.preventDefault();
                if (content) mutation();
              }}
            >
              <input
                type="text"
                placeholder="Type a message..."
                value={content}
                onChange={e => setContent(e.target.value)}
                ref={inputRef}
              />
            </form>
          )}
        </Mutation>
      </div>
    </div>
  );
};

export default MessageBox;
