import React, { memo } from 'react';

import 'styles/css/loaders.css';

const Spinner = () => (
  <div className="spinner">
    <div className="lds-dual-ring" />
  </div>
);

export default memo(Spinner);
