import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import AuthenticationContext from 'context/AuthenticationContext';

import FormInputValidation from 'components/form/FormInputValidation';

import {
  validateEmail,
  validateUsername,
  validatePassword,
  isEmpty
} from 'utils';
import { SIGNUP_MUTATION } from 'apollo/queries';

import 'styles/css/authentication.css';

class Signup extends Component {
  state = {
    email: '',
    emailValid: true,
    username: '',
    usernameValid: true,
    password: '',
    passwordValid: true,
    confirm: '',
    confirmValid: true,
    valid: false,
    error: ''
  };

  componentWillMount() {
    document.title = 'Twoot | Login';
  }

  static contextType = AuthenticationContext;

  constructor(props) {
    super(props);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this);
  }

  validation = ({
    email,
    username,
    password,
    confirm,
    emailValid,
    usernameValid,
    passwordValid,
    confirmValid
  }) => {
    return (
      emailValid &&
      usernameValid &&
      passwordValid &&
      confirmValid &&
      !isEmpty(email) &&
      !isEmpty(username) &&
      !isEmpty(password) &&
      !isEmpty(confirm)
    );
  };

  handleChangeEmail(e) {
    const email = e.target.value;
    const emailValid = validateEmail(email);
    const valid = this.validation({ ...this.state, emailValid });
    this.setState({ valid, emailValid, email });
  }

  handleChangeUsername(e) {
    const username = e.target.value;
    const usernameValid = validateUsername(username);
    const valid = this.validation({ ...this.state, usernameValid });
    this.setState({ valid, usernameValid, username });
  }

  handleChangePassword(e) {
    const password = e.target.value;
    const passwordValid = validatePassword(password);
    const valid = this.validation({ ...this.state, passwordValid });
    this.setState({ valid, passwordValid, password });
  }

  handleChangeConfirm(e) {
    const confirm = e.target.value;
    const confirmValid = confirm === this.state.password;
    const valid = this.validation({ ...this.state, confirmValid });
    this.setState({ valid, confirmValid, confirm });
  }

  render() {
    const {
      email,
      emailValid,
      username,
      usernameValid,
      password,
      passwordValid,
      confirm,
      confirmValid,
      valid
    } = this.state;
    return (
      <div className="auth-form">
        <h1>Create your account</h1>
        <FormInputValidation
          id="email"
          type="email"
          label="E-Mail"
          value={email}
          placeholder="name@example.com"
          handleChange={this.handleChangeEmail}
          tooltipId="emailInvalid"
          isValid={emailValid}
          content={emailErrorContent}
        />
        <FormInputValidation
          id="username"
          type="text"
          label="Username"
          value={username}
          placeholder="This name will be displayed on the site"
          handleChange={this.handleChangeUsername}
          tooltipId="usernameInvalid"
          isValid={usernameValid}
          content={usernameErrorContent}
        />
        <FormInputValidation
          id="password"
          type="password"
          label="Password"
          value={password}
          placeholder="Choose a password"
          handleChange={this.handleChangePassword}
          tooltipId="passwordInvalid"
          isValid={passwordValid}
          content={passwordErrorContent}
        />
        <FormInputValidation
          id="confirm"
          type="password"
          label="Password confirmation"
          value={confirm}
          placeholder="Re-enter the password for confirmation"
          handleChange={this.handleChangeConfirm}
          tooltipId="confirmInvalid"
          isValid={confirmValid}
          content={confirmErrorContent}
        />
        <div className="form-actions">
          {this.state.error && <div className="error">{this.state.error}</div>}
          <Mutation
            mutation={SIGNUP_MUTATION}
            variables={{ email, username, password }}
            onCompleted={data => this._signup(data)}
            onError={err => this._handleError(err)}
          >
            {mutation => (
              <button disabled={!valid} onClick={mutation}>
                Sign Up
              </button>
            )}
          </Mutation>
        </div>
        <div className="hr" />
        <div className="form-actions">
          <p>
            Already have an account ? Switch to{' '}
            <NavLink to="/login">Login</NavLink>.
          </p>
        </div>
      </div>
    );
  }

  _handleError = async err => {
    this.setState({ error: err.graphQLErrors[0].message });
  };

  _signup = async data => {
    const {
      token,
      user: { id, username, avatar }
    } = data.signup;
    this.context.login(token, { id, username, avatar });
    this.props.history.push(`/`);
  };
}

export default Signup;

const emailErrorContent = <span>Please enter a valid email address.</span>;
const usernameErrorContent = (
  <span>
    A valid username should contain between 3 and 20 characters (alphanumeric,
    hyphen or underscore).
  </span>
);
const confirmErrorContent = (
  <span>Password missmatch. Please check your input.</span>
);
const passwordErrorContent = (
  <>
    <label>Please enter a valid password.</label>
    <label>A valid password should have :</label>
    <ul>
      <li>At least 8 characters</li>
      <li>At least one lowercase letter</li>
      <li>At least one uppercase letter</li>
      <li>At least on numeric character</li>
      <li>At least one special character (!@#$%&)</li>
    </ul>
  </>
);
