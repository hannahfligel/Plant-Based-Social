import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPage from "../UserPage/UserPage";

//props holds the recipe type as "name" and the id as "id"
function RecipeTypeButtons(props) {
  const dispatch = useDispatch();

  //filter will allow to render the specific recipes associated with the recipe type id
  const filter = () => {
    // console log that a filter button was clicked, and display it's id
    console.log("Clicked a filter button------------>", props.id);
    //dispatch FETCH_RECIPES_BY_TYPE with the payload of the recipe type id
    dispatch({
      type: "FETCH_RECIPES_BY_TYPE",
      //props.id hold the recipe type id and is coming in via props from UserPage
      payload: props.id,
    });
  };

  return (
    // onClick of a button, run the filter function
    <button className="filterButtons" onClick={filter}>
      {/* props.name is coming from UserPage & holds the name of the recipe type */}
      {props.name}
    </button>
  );
}

export default RecipeTypeButtons;
