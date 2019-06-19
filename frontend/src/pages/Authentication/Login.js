import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { AUTH_TOKEN, SERVER_ERROR_MESSAGE } from '../../constants';

import '../../Styles/css/authentication.css';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

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
            onCompleted={data => this._confirm(data)}
            onError={err => this._handleError(err)}
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
    if (err.graphQLErrors)
      this.setState({ error: err.graphQLErrors[0].message });
    else
      this.setState({ error: SERVER_ERROR_MESSAGE });
  }

  _confirm = async data => {
    const { token } = data.login;
    this._saveUserData(token);
    this.props.history.push(`/`);
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default Login;
