import React, { useState } from 'react';
import {useSelector} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name RecipeCard with the name for the new component.
function RecipeCard(props) {

  return (
    <div>
        {/* {JSON.stringify(props)} */}
        <img src={props.recipe.image_url}/>
        <h3>{props.recipe.recipe_name}</h3>
        {/* will need to add conditional rendering for displaying hour & min info for prep time */}
        <p>{props.recipe.prep_hours} hours {props.recipe.prep_minutes} minutes</p>
        <p>{props.recipe.likes} likes</p>
    </div>
  );
}

export default RecipeCard;
