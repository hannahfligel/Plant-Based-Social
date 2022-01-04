import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import Nav from "../Nav/Nav";
import { Container } from "react-bootstrap";
import "../LikedRecipes/LikedRecipes.css";
import Banner from "../../images/likesbackground.png";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name LikedRecipes with the name for the new component.
function LikedRecipes(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const likedRecipes = useSelector(
    (store) => store.recipeReducer.likedRecipesReducer
  );

  useEffect(() => {
    dispatch({
      type: "FETCH_LIKED_RECIPES",
      payload: user.id,
    });
  }, []);

  return (
    <>
      <img src={Banner} />
      <Container className="favoritesContainer">
        <h1 className="likedRecipesH1">My favorite recipes</h1>
        <div className="recipeCardContainer">
          {likedRecipes.map((likedRecipe) => {
            return <RecipeCard recipe={likedRecipe} key={likedRecipe.id} />;
          })}
        </div>
      </Container>
      <Nav />
    </>
  );
}

export default LikedRecipes;
