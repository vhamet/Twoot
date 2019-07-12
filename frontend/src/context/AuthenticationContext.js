import React from 'react';

export default React.createContext({
  token: null,
  loggedUser: null,
  login: () =>{},
  logout: () =>{},
  addConversation: () =>{},
  removeConversation: () =>{},
});