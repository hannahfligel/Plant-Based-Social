import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import SharedRecipeCard from "../SharedRecipes/SharedRecipeCard";
import Nav from "../Nav/Nav";
import "../SharedRecipes/SharedRecipes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Container } from "react-bootstrap";
import ShareBanner from "../../images/share-background.png";
import Banner from "../../images/likesbackground.png";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function SharedRecipes(props) {
  const dispatch = useDispatch();

  const userIcon = <FontAwesomeIcon icon={faUserCircle} />;

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
    <>
      <img src={Banner} />
      <Container className="sharedRecipesContainer">
        {/* {JSON.stringify(sharedRecipesImage)} */}

        <h1 className="sharedRecipesH1">Your Shared Recipes</h1>
        {sharedRecipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <div className="sharedUser">
                <span className="userIcon">{userIcon}</span>
                <h2 className="sharedRecipesP">
                  {recipe.sender} sent a recipe!
                </h2>
              </div>
              <SharedRecipeCard recipe={recipe} />
            </div>
          );
        })}
      </Container>
      <Nav />
    </>
  );
}

export default SharedRecipes;
