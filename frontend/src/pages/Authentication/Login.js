import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import AuthenticationContext from 'context/AuthenticationContext';

import { LOGIN_MUTATION } from 'apollo/queries';

import 'styles/css/authentication.css';

class Login extends Component {
  state = {
    login: '',
    password: '',
    error: ''
  };

  static contextType = AuthenticationContext;

  render() {
    const { login, password } = this.state;
    return (
      <div className="auth-form">
        <h1>Login to Twoot</h1>
        <div className="form-control">
          <input
            id="login"
            type="login"
            value={login}
            placeholder="Username or email address"
            onChange={e => this.setState({ login: e.target.value })}
          />
        </div>
        <div className="form-control">
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
        </div>
        <div className="form-actions">
          {this.state.error && <div className="error">{this.state.error}</div>}
          <Mutation
            mutation={LOGIN_MUTATION}
            variables={{ login, password }}
            onCompleted={data => this._login(data)}
            onError={err => this._handleError(err)}
            update={(cache, { data: { login } }) => {
              cache.writeData({
                data: {
                  loggedUser: login.user
                }
              });
            }}
          >
            {mutation => <button onClick={mutation}>Login</button>}
          </Mutation>
        </div>
        <div className="hr" />
        <div className="form-actions">
          <p>
            Not a member yet ? Switch to <NavLink to="/signup">Signup</NavLink>{' '}
            and create an account.
          </p>
        </div>
      </div>
    );
  }

  _handleError = async err => {
    this.setState({ error: err.graphQLErrors[0].message });
  };

  _login = async data => {
    const {
      token,
      user: { id, username }
    } = data.login;
    this.context.login(token, { id, username });
    this.props.history.push(`/`);
  };
}

export default Login;
