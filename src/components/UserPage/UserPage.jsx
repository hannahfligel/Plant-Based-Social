import LogOutButton from '../LogOutButton/LogOutButton';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function UserPage() {

  const dispatch = useDispatch();

  const recipeReducer = useSelector((store) => store.recipeReducer);


  useEffect(() => {
    dispatch({ type: "FETCH_RECIPE_CARD_INFO" });
  }, []);

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      {JSON.stringify(recipeReducer)}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
