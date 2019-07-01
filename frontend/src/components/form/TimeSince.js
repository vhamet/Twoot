import React from 'react';

import 'styles/css/timesince.css';

const TimeSince = ({ timespan, date }) => (
  <div className="timesince">
    <label title={date}>{timespan}</label>
  </div>
);

export default TimeSince;
