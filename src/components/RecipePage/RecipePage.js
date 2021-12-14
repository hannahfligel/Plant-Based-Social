import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name RecipePage with the name for the new component.
function RecipePage(props) {

const dispatch = useDispatch();

useEffect(() => {
    dispatch({ type: "FETCH_RECIPE_PAGE_INFO" });
    dispatch({ type: "FETCH_RECIPE_INGREDIENTS" });
    dispatch({ type: "FETCH_RECIPE_INSTRUCTIONS" });
    dispatch({ type:"FETCH_SPECIFIC_RECIPE_TYPE"});
  }, []);
  
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const ingredients = useSelector((store) => store.recipeReducer.recipeIngredientsReducer);
  const recipe_type = useSelector((store) => store.recipeReducer.specificRecipeTypeReducer);
  const store = useSelector((store) => store);
  const recipeGeneralInfo = useSelector((store) => store.recipeReducer.recipePageReducer);
  const instructions = useSelector((store) => store.recipeReducer.recipeInstructionsReducer);
  const likes = useSelector((store) => store.recipeReducer.recipePageReducer.likes);



  const [heading, setHeading] = useState('Recipe');

  return (
    <div>
      <h2>{heading}</h2>
      {/* <p>{JSON.stringify(ingredients)}</p>
      <p>{JSON.stringify(recipeGeneralInfo)}</p>
      <p>{JSON.stringify(instructions)}</p>
      <p>{JSON.stringify(likes)}</p> */}
      <p>{JSON.stringify(recipe_type)}</p>

    </div>
  );
}

export default RecipePage;
