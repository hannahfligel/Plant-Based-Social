import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../RegisterPage/RegisterPage.css';

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
      <div>
        <input
          className="registerInput"
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
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
      <div>
        {/* <input className="btn" type="submit" name="submit" value="Register" /> */}
        <button onClick={registerUser}>
          Register
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
