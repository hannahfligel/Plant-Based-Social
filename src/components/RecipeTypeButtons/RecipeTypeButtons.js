import React, { useState } from 'react';
import {useSelector} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name RecipeTypeButtons with the name for the new component.
function RecipeTypeButtons(props) {

  return (
    //return a button with the name of the recipe type 
    <button>{props.name}</button>
  );
}

export default RecipeTypeButtons;
