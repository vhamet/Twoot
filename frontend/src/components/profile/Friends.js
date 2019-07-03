import React from 'react';

const Friends = ({ friends }) => (
  <div>
    {friends.map(friend => (
      <div key={friend.id}>{friend.username}</div>
    ))}
  </div>
);

export default Friends;
