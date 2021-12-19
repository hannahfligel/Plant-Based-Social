import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';



// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AddRecipeButton with the name for the new component.
function AddRecipeButton(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const dispatch = useDispatch();


  const [newRecipe, setNewRecipe] = useState({
    recipe_name: "new recipe",
  });

  const addRecipe = () =>{
    dispatch({ 
        type: "ADD_RECIPE", 
        payload: newRecipe
    });
  }




  return (
    <>
        <Link onClick={addRecipe} className="navLink" to="/add-recipe">
            Add
        </Link>
    </>
  );
}

export default AddRecipeButton;
