import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import AuthenticationContext from 'context/AuthenticationContext';

import { LOGIN_MUTATION } from 'apollo/queries';

import 'Styles/css/authentication.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  static contextType = AuthenticationContext;

  render() {
    const { email, password } = this.state;
    return (
      <div className="auth-form">
        <h1>Login to Twoot</h1>
        <div className="form-control">
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Username or email address"
            onChange={e => this.setState({ email: e.target.value })}
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
            variables={{ email, password }}
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
      user: { id }
    } = data.login;
    this.context.login(token, id);
    this.props.history.push(`/`);
  };
}

export default Login;
