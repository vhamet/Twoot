import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './components/navigation/MainNavigation';
import LoginPage from './pages/Authentication/Login';
import SignupPage from './pages/Authentication/Signup';

import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
