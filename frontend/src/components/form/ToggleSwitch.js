import React from 'react';

import 'styles/css/toggleSwitch.css';

const ToggleSwitch = props => {
  const style = props.checked ? { left: '1rem' } : { left: 0 };

  return (
    <div className="toggleSwitch__container" onClick={props.onChange}>
      <div className="toggleSwitch-switch" style={style} />
    </div>
  );
};

export default ToggleSwitch;
