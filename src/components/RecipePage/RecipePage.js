import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Ingredient from "../Ingredient/Ingredient";
import Instruction from '../Instruction/Instruction';
import AddLikeButton from "../AddLikeButton/AddLikeButton";
import EditRecipeButton from "../EditRecipeButton/EditRecipeButton";
import ShareModal from "../ShareModal/ShareModal";
import Button from 'react-bootstrap/Button';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name RecipePage with the name for the new component.
function RecipePage(props) {

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);



  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const ingredients = useSelector(
    (store) => store.recipeReducer.recipeIngredientsReducer
  );
  const recipe_type = useSelector(
    (store) => store.recipeReducer.specificRecipeTypeReducer
  );
  const store = useSelector((store) => store);

  //recipeGeneralInfo hold all everything on the form other than ingredients, instructions, and recipe types 
  const recipeGeneralInfo = useSelector(
    (store) => store.recipeReducer.recipePageReducer
  );

  const likedStatus = useSelector(
    (store) => store.recipeReducer.likedStatusReducer
  );

  const instructions = useSelector(
    (store) => store.recipeReducer.recipeInstructionsReducer
  );
  // const likes = useSelector(
  //   (store) => store.recipeReducer.recipePageReducer.likes
  // );



  const [heading, setHeading] = useState("Recipe");

  return (
    <div>
      <ShareModal/>
      {JSON.stringify(likedStatus)}
      <img src={recipeGeneralInfo.image_url} />
      <AddLikeButton recipeId={recipeGeneralInfo.id}/>

      {/* conditionally render to only show the edit button if an admin is logged in */}
      {user.admin && ( 
      <EditRecipeButton recipe_id={recipeGeneralInfo.id}/>
      )}
      
      <p>{recipeGeneralInfo.difficulty}</p>
      <p>{recipeGeneralInfo.prep_hours} hr</p>
      <p>{recipeGeneralInfo.prep_minutes} min</p>
      <p>Servings: {recipeGeneralInfo.servings}</p>

      <h1>{recipeGeneralInfo.recipe_name}</h1>
      <h5>{recipeGeneralInfo.recipe_description}</h5>

      <hr className="solid" />

      <h3>Ingredients</h3>

      <ul>
      {ingredients.map((ingredient) => {
          return(
          <Ingredient
            key={ingredient.id}
            ingredientName={ingredient.ingredient}
            ingredientAmount={ingredient.ingredient_amount}
            ingredientId={ingredient.id}
            editMode={false}
            />
          );
        })}
      </ul>
      
      <h3>Instructions</h3>
      <ul>
      {instructions.map((instruction) => {
          return(
          <Instruction
            key={instruction.id}
            instructionName={instruction.instruction}
            instructionId={instruction.id}
            editMode={false}// <--- editMode determines whether or not the delete buttons show up 
          />
          );
        })}
      </ul>
    </div>
  );
}

export default RecipePage;
