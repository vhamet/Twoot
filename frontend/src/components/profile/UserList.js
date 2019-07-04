import React from 'react';

const UserList = ({ users }) => (
  <div>
    {users.map(user => (
      <div key={user.id}>{user.username}</div>
    ))}
  </div>
);

export default UserList;
