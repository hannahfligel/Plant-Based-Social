import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import handsGraphic from '../../images/handsgraphic.png';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';


function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  const onRegister = (event) => {
    history.push('/registration');
  };

  return (
    <div className="container">
      <img src={handsGraphic}/>
      <h1>Welcome to</h1>
      <h2>Plant Based Social</h2>


      <div>
            <button className="btn btn_sizeSm" onClick={onRegister}>
            REGISTER</button>
            <h4>Already have an account?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              GET STARTED
            </button>
      </div>
      </div>
  );
}

export default LandingPage;
