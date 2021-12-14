import {useSelector, useDispatch} from 'react-redux';
import React, { useState, useEffect } from 'react';



// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name SavedRecipes with the name for the new component.
function SavedRecipes(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();

  const savedRecipes = useSelector((store) => store.recipeReducer.savedRecipesReducer);
  const [heading, setHeading] = useState('Saved Recipes');

  useEffect(() => {
    dispatch({ type: "FETCH_SAVED_RECIPES" });
  }, []);

  return (
    <div>
      <h2>{heading}</h2>
      {JSON.stringify(savedRecipes)}
    </div>
  );
}

export default SavedRecipes;
