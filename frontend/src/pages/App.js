import React, { Component, Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from 'pages/Authentication/Login';
import SignupPage from 'pages/Authentication/Signup';
import Feed from 'pages/Feed';
import MainNavigation from 'components/navigation/MainNavigation';

import 'Styles/css/app.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Route path="/home" component={Feed} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default App;
