import React, { useState, useEffect, memo } from 'react';

import 'styles/css/dropdown.css';

const DropDown = props => {
  const [show, setShow] = useState(false);

  const closeMenu = e => {
    !e.target.closest('.dropdown_keep') && setShow(false);
  };

  useEffect(() => {
    if (show) document.addEventListener('click', closeMenu);
    else document.removeEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  });

  return (
    <div className="dropdown__container">
      <div className="dropdown__menu" onClick={() => setShow(true)}>{props.menu}</div>
      {show && <div className="dropdown__content">{props.children}</div>}
    </div>
  );
};

export default memo(DropDown);
