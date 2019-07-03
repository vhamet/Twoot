import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import anon from 'images/default.png';

import 'styles/css/avatar.css';

const Avatar = props => {
  const src = props.src || anon;
  const size = props.size || '3rem;';
  const style = { borderRadius: '50%', height: size, width: size };
  return props.id ? (
    <div className="avatar__container">
      <Link to={`/profile/${props.id}`}>
        <img src={src} alt="avatar" style={style} />
      </Link>
    </div>
  ) : (
    <div className="avatar__container">
      <img src={src} alt="avatar" style={style} />
    </div>
  );
};

export default memo(Avatar);
