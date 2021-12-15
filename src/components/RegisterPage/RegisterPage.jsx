import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import pbsLogo from '../../images/plantbasedsocial-logo.png';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <img src={pbsLogo}/>
      <h1>Register</h1>
      <p>Register to become a part of our community and unlock all of our user features</p>
      <RegisterForm />

      <center>
        Already have an account?
        <br/>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
