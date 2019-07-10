import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import Alert from 'components/navigation/Alert';
import DropDown from 'components/form/DropDown';
import Loader from 'components/loaders/Loader';

import { INIT_ALERT_QUERY, NEW_ALERT_SUBSCRIPTION } from 'apollo/queries';

import 'styles/css/alert.css';

const AlertMenu = props => {
  const [newAlerts, setNewAlerts] = useState(0);

  const subscribeToNewAlerts = subscribeToMore => {
    subscribeToMore({
      document: NEW_ALERT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newAlert = subscriptionData.data.newAlert;
        const exists = prev.alerts.find(({ id }) => id === newAlert.id);
        if (exists) return prev;

        setNewAlerts(newAlerts + 1);
        return Object.assign({}, prev, {
          alerts: [newAlert, ...prev.alerts]
        });
      }
    });
  };

  return (
    <Query query={INIT_ALERT_QUERY} variables={{ first: 5 }}>
      {({ loading, error, data, subscribeToMore }) => {
        subscribeToNewAlerts(subscribeToMore);
        if (!error && !loading)
          setNewAlerts(data.alerts.filter(alert => !alert.seen).length);

        return (
          <DropDown
            menu={
              <div className="alert-menu__link">
                <FontAwesomeIcon icon={faBell} />
                {newAlerts > 0 && (
                  <div className="new-alert-icon">{newAlerts}</div>
                )}
              </div>
            }
          >
            <div className="alerts__container">
              {(error && <div>Error</div>) ||
                (loading && <Loader />) ||
                (!data.alerts.length && <div className="empty-alert">No alert to show</div>) || (
                  <div>
                    {data.alerts.map(alert => (
                      <Alert key={alert.id} alert={alert} />
                    ))}
                  </div>
                )}
            </div>
          </DropDown>
        );
      }}
    </Query>
  );
};

export default AlertMenu;
