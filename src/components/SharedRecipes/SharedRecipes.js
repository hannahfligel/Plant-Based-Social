import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import Nav from "../Nav/Nav";


// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function SharedRecipes() {
  const dispatch = useDispatch();

  const userId = useSelector((store) => store.user.id);
  const sharedRecipes = useSelector(
    (store) => store.recipeReducer.sharedRecipesReducer
  );
  const sharedRecipesSender = useSelector(
    (store) => store.recipeReducer.sharedRecipesReducer.sender
  );
  const sharedRecipesImage = useSelector(
    (store) => store.recipeReducer.sharedRecipesReducer.image_url
  );
  const recipeCardInfo = useSelector(
    (store) => store.recipeReducer.recipeCardReducer
  );


  useEffect(() => {
    dispatch({
      type: "FETCH_SHARED_RECIPES",
      payload: userId,
    });
  }, []);

  return (
    <div className="container">
      {/* {JSON.stringify(sharedRecipesSender)}
      {JSON.stringify(sharedRecipesImage)} */}

      <p>Recipes SharedRecipes with you</p>
      {sharedRecipes.map((recipe) => {
        return (
          <div key={recipe.id}>
            <p>{recipe.sender} shared a recipe with you!</p>
            <RecipeCard recipe={recipe} />
          </div>
        );
      })}
      <Nav/>
    </div>
  );
}

export default SharedRecipes;
