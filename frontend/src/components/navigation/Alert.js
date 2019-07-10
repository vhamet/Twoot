import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import Avatar from 'components/avatar/Avatar';

import { timeDifferenceForDate } from 'utils';
import {
  UPDATE_READ_ALERT_MUTATION,
  UPDATE_ALERT_FRAGMENT as fragment
} from 'apollo/queries';

const Alert = props => {
  const { alert } = props;
  let seen, title, icon;
  if (alert.seen) {
    seen = false;
    title = 'Mark as unread';
    icon = faEye;
  } else {
    seen = true;
    title = 'Mark as read';
    icon = faEyeSlash;
  }

  let message = '',
    avatar = null;
  if (alert.onComment) {
    message = (
      <label>
        <b>{alert.onComment.postedBy.username}</b> commented your post
      </label>
    );
    avatar = alert.onComment.postedBy.avatar;
  } else if (alert.onFollower) {
    message = (
      <label>
        <b>{alert.onFollower.username}</b> is now following you
      </label>
    );
    avatar = alert.onFollower.avatar;
  }

  const handleClick = (event, mutation) => {
    if (event.target.closest('.toggleRead')) return;
    if (!alert.seen) mutation();

    if (alert.onComment) props.history.push(`/post/${alert.onComment.postedOn.id}`);
    else if (alert.onFollower) props.history.push(`/profile/${alert.onFollower.id}`);
  };

  return (
    <Mutation
      mutation={UPDATE_READ_ALERT_MUTATION}
      variables={{ alertId: alert.id, seen }}
      update={(cache, { data: { _ } }) => {
        const id = `Alert:${alert.id}`;
        const cachedAlert = cache.readFragment({ fragment, id });
        const data = {
          ...cachedAlert,
          seen
        };

        cache.writeFragment({ fragment, id, data });
      }}
    >
      {mutation => (
        <div
          className={`alert${alert.seen ? ' seen' : ''}`}
          onClick={e => handleClick(e, mutation)}
        >
          <Avatar src={avatar} size="3rem" />
          <div className="alert__content">
            {message}
            <label>{timeDifferenceForDate(alert.createdAt)}</label>
          </div>
          <div className="toggleRead dropdown_keep" title={title} onClick={mutation}>
            <FontAwesomeIcon icon={icon} />
          </div>
        </div>
      )}
    </Mutation>
  );
};

export default withRouter(Alert);
