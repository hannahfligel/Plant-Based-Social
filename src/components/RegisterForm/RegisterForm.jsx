import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../RegisterPage/RegisterPage.css";
import { Button } from "react-bootstrap";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="registerForm" onSubmit={registerUser}>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="registerInputContainer">
        <input
          className="registerInput"
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className="registerInput"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="registerButton">
        {/* <input className="btn" type="submit" name="submit" value="Register" /> */}
        <Button className="btn-primary registerButton" onClick={registerUser}>
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
