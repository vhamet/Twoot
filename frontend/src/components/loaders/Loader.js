import React, { memo } from 'react';

import 'styles/css/loaders.css';

const Loader = () => (
  <div className="lds-ellipsis__container">
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default memo(Loader);
