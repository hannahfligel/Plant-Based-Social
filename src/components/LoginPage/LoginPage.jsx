import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import pbsLogo from "../../images/plantbasedsocial-logo.png";

import { Container } from "react-bootstrap";
import "./LoginPage.css";

function LoginPage() {
  const history = useHistory();

  return (
    <Container className="logInPageContainer">
      <img className="pbs-logo" src={pbsLogo} />
      <h1 className="login-h1">Welcome back</h1>
      <p className="login-p">
        Sign in to have full access to our Plant-Based recipes
      </p>
      <LoginForm />
      Not a registered user?
      <br />
      <a
        type="button"
        className="btn_asLink"
        onClick={() => {
          history.push("/registration");
        }}
      >
        register
      </a>
    </Container>
  );
}

export default LoginPage;
