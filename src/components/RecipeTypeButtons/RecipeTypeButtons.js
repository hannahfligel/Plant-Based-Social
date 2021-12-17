import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name RecipeTypeButtons with the name for the new component.
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
    <button onClick={filter}>{props.name}</button> //<---props.name is coming from UserPage

    
  );
}

export default RecipeTypeButtons;
