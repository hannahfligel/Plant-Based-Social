import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Ingredient from "../Ingredient/Ingredient";
import Instruction from '../Instruction/Instruction';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name RecipePage with the name for the new component.
function RecipePage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_RECIPE_PAGE_INFO" });
    dispatch({ type: "FETCH_RECIPE_INGREDIENTS" });
    dispatch({ type: "FETCH_RECIPE_INSTRUCTIONS" });
    dispatch({ type: "FETCH_SPECIFIC_RECIPE_TYPE" });
  }, []);

  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const ingredients = useSelector(
    (store) => store.recipeReducer.recipeIngredientsReducer
  );
  const recipe_type = useSelector(
    (store) => store.recipeReducer.specificRecipeTypeReducer
  );
  const store = useSelector((store) => store);
  const recipeGeneralInfo = useSelector(
    (store) => store.recipeReducer.recipePageReducer
  );
  const instructions = useSelector(
    (store) => store.recipeReducer.recipeInstructionsReducer
  );
  const likes = useSelector(
    (store) => store.recipeReducer.recipePageReducer.likes
  );

  const [heading, setHeading] = useState("Recipe");

  return (
    <div>
      <img src={recipeGeneralInfo.image_url} />
      <p>{recipeGeneralInfo.difficulty}</p>
      <p>{recipeGeneralInfo.prep_hours} hr</p>
      <p>{recipeGeneralInfo.prep_minutes} min</p>
      <p>Servings: {recipeGeneralInfo.servings}</p>

      <h1>{recipeGeneralInfo.recipe_name}</h1>
      <h5>{recipeGeneralInfo.recipe_description}</h5>

      <hr className="solid" />

      <h3>Ingredients</h3>



      {/* <ul>
        {ingredients.map((ingredient => {
          return (
            //onClick, run the details function and passing it the individual movie info that was clicked on
            //render the RecipeTypeButtons component and pass down the name of the recipe type to it as "name"
            <RecipeTypeButtons
              key={ingredient.id}
              name={ingredient.ingredients}
            />
          );
        })}
      </ul> */}

      {/* {JSON.stringify(ingredients)} */}

      {/* <img src={props.recipe.image_url}/> */}
      {/* <p>{JSON.stringify(ingredients)}</p>
      <p>{JSON.stringify(recipeGeneralInfo)}</p>
      <p>{JSON.stringify(instructions)}</p>
      <p>{JSON.stringify(likes)}</p> */}
      {/* <p>{JSON.stringify(recipe_type)}</p>
      <p>{JSON.stringify(ingredients)}</p> */}
      {/* <p>{JSON.stringify(recipeGeneralInfo)}</p> */}

      <ul>
      {ingredients.map((ingredient) => {
          return(
          <Ingredient
            key={ingredient.id}
            ingredientName={ingredient.ingredient}
            ingredientAmount={ingredient.ingredient_amount}
            ingredientId={ingredient.id}/>
          );
        })}
      </ul>
      
      <h3>Instructions</h3>
      <ul>
      {instructions.map((instruction) => {
          return(
          <Ingredient
            key={instruction.id}
            ingredientName={instruction.instruction}
            ingredientId={instruction.id}/>
          );
        })}
      </ul>
    </div>
  );
}

export default RecipePage;
