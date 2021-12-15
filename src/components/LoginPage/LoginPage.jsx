import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import pbsLogo from '../../images/plantbasedsocial-logo.png';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <img src={pbsLogo}/>
      <h1>Welcome back</h1>
      <p>Sign in to have full access to your Plant-Based recipes</p>
      <LoginForm />

      <center>
        Not a registered user?
        <br/>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
