import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import cookie from 'react-cookies';

import AuthenticationContext from 'context/AuthenticationContext';
import { resolvers, typeDefs } from 'apollo/resolvers';
import { USER_QUERY } from 'apollo/queries';
import { AUTH_COOKIE } from 'constants.js';

import MainNavigation from 'components/navigation/MainNavigation';
import LoginPage from 'pages/Authentication/Login';
import SignupPage from 'pages/Authentication/Signup';
import Home from 'pages/Home';
import Profile from 'pages/Profile';

import 'styles/css/app.css';

class App extends Component {
  state = {
    token: null,
    loggedUser: null
  };

  login = (token, user) => {
    cookie.save(AUTH_COOKIE, { token, userId: user.id }, { path: '/' });
    this.setState({ token, loggedUser: user });
  };

  logout = () => {
    cookie.remove(AUTH_COOKIE, { path: '/' });
    this.setState({ token: null, loggedUser: null });
  };

  httpLink = createHttpLink({
    uri: 'http://localhost:4000',
    opts: {
      credentials: 'include'
    }
  });

  authLink = setContext((_, { headers }) => {
    const { token } = this.state;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  wsLink = new WebSocketLink({
    uri: `ws://localhost:4000`,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: this.state.token
      }
    }
  });

  link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    this.wsLink,
    this.authLink.concat(this.httpLink)
  );

  client = new ApolloClient({
    link: this.link,
    cache: new InMemoryCache(),
    typeDefs,
    resolvers
  });

  async fetchLoggedUser(userId) {
    const {
      data: { user }
    } = await this.client.query({
      query: USER_QUERY,
      variables: { id: userId }
    });
    this.client.writeData({
      data: {
        loggedUser: user
      }
    });

    this.setState({ loggedUser: user });
  }

  componentDidMount() {
    const authCookie = cookie.load(AUTH_COOKIE);
    if (authCookie) {
      const { token, userId } = authCookie;
      this.fetchLoggedUser(userId);
      this.setState({ token, loggedUser: { id: userId } });
    }
  }

  render() {
    return (
      <AuthenticationContext.Provider
        value={{
          token: this.state.token,
          loggedUser: this.state.loggedUser,
          login: this.login,
          logout: this.logout
        }}
      >
        <ApolloProvider client={this.client}>
          <MainNavigation
            loggedUser={this.state.loggedUser}
            logout={this.logout}
          />
          <main className="main-content">
            <Switch>
              <Redirect from="/" to="/home" exact />
              <Route path="/home" component={Home} />
              <Route path="/profile/:userId" component={Profile} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignupPage} />
            </Switch>
          </main>
        </ApolloProvider>
      </AuthenticationContext.Provider>
    );
  }
}

export default App;
