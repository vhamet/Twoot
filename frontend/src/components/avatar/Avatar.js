import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import anon from 'images/default.png';

import 'styles/css/avatar.css';

const Avatar = props => {
  const src = props.src || anon;
  const size = props.size || '3rem';
  const containerStyle = { height: size, width: size };
  const imgStyle = { borderRadius: props.square ? '' : '50%' };
  return props.id ? (
    <div className="avatar__container" style={containerStyle}>
      <Link to={`/profile/${props.id}`}>
        <img src={src} alt="avatar" style={imgStyle}/>
      </Link>
    </div>
  ) : (
    <div className="avatar__container" style={containerStyle}>
      <img src={src} alt="avatar" style={imgStyle}/>
    </div>
  );
};

export default memo(Avatar);
