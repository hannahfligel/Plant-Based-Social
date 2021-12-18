import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

//props holds the recipe type as "name" and the id as "id"
function RecipeTypeButtons(props) {

  const dispatch = useDispatch();



  const filter = () =>{
    // console log that a filter button was clicked, and display it's id 
    console.log("Clicked a filter button------------>", props.id)
    //dispatch the specific recipe type id in order to search for it in the database
    dispatch({ 
      type: "FETCH_RECIPES_BY_TYPE", 
      payload: props.id
   });
  }

  return (
    // onClick of a button, run the filter function 
    //props.name is coming from UserPage & holds the name of the recipe type
    <button onClick={filter}>{props.name}</button> 

    
  );
}

export default RecipeTypeButtons;
