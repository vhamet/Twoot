import React from 'react';
import { Mutation } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import Avatar from 'components/avatar/Avatar';

import { timeDifferenceForDate } from 'utils';
import {
  UPDATE_READ_ALERT_MUTATION,
  UPDATE_ALERT_FRAGMENT as fragment
} from 'apollo/queries';

const Alert = ({ alert }) => {
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

  if (alert.onComment)
    return (
      <div className={`alert${alert.seen ? ' seen' : ''}`}>
        <Avatar src={alert.onComment.postedBy.avatar} size="3rem" />
        <div className="alert__content">
          <label>
            <b>{alert.onComment.postedBy.username}</b> commented your post
          </label>
          <label>{timeDifferenceForDate(alert.createdAt)}</label>
        </div>
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
            <div className="dropdown_keep" title={title} onClick={mutation}>
              <FontAwesomeIcon icon={icon} />
            </div>
          )}
        </Mutation>
      </div>
    );
};

export default Alert;
