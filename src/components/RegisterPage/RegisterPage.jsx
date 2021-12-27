import React from 'react';
import { Button, Container } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import pbsLogo from '../../images/plantbasedsocial-logo.png';
import "./RegisterPage.css";

function RegisterPage() {
  const history = useHistory();

  return (
    <Container className="registerPageContainer">
      <img className="pbs-logo" src={pbsLogo}/>
      <h1 className='register-h1'>Register</h1>
      <p className="register-p">Register to become a part of our community and unlock all of our user features</p>
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
    </Container>
  );
}

export default RegisterPage;
