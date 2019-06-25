import React, { useState } from 'react';

import 'Styles/css/dropdown.css';

const DropDown = props => {
  const [show, setShow] = useState(false);

  const showMenu = e => {
    e.preventDefault();
    if (show) closeMenu();
    else {
      document.addEventListener('click', closeMenu);
      setShow(true);
    }
  };

  const closeMenu = e => {
    if(!e.target.closest('.dropdown_keep')) {
      document.removeEventListener('click', closeMenu);
      setShow(false);
    }
  };

  return (
    <div className="dropdown__container">
      <div onClick={showMenu}>{props.menu}</div>
      {show && <div className="dropdown-menu__container">{props.children}</div>}
    </div>
  );
};

export default DropDown;
