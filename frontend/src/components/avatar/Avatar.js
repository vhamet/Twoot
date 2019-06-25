import React from 'react';
import { Link } from 'react-router-dom';
 
import anon from 'images/anon.png';

import 'Styles/css/avatar.css';

const Avatar = props => {
  const size = props.size || '3rem;';
  const src = props.src || anon;
  return (
    <div className="avatar__container">
      <Link to={`/user/:${props.id}`}>
      <img
        src={src}
        alt="avatar"
        style={{ borderRadius: '50%', height: size }}
      />
      </Link>
    </div>
  );
};

export default Avatar;
