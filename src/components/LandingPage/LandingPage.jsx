import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { ButtonGroup, Button, Container } from "react-bootstrap";
import handsGraphic from "../../images/handsgraphic.png";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  const onRegister = (event) => {
    history.push("/registration");
  };

  return (
    <Container className="landingPageContainer">
      <img alt="graphic" className="landingImg" src={handsGraphic} />
      <h1 className="landingH1">Welcome to</h1>
      <h2 className="landingH2">Plant Based Social</h2>

      <ButtonGroup vertical className="buttonGroup">
        <Button className="btn-primary landingBtnPrimary" onClick={onRegister}>
          GET STARTED
        </Button>
        <p className="landingPText">Already have an account?</p>
        <Button className="btn-secondary landingBtnsecondary" onClick={onLogin}>
          SIGN IN
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default LandingPage;
