import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name RecipeCard with the name for the new component.
function RecipeCard(props) {
  const dispatch = useDispatch();

  const history = useHistory();


  const userId = useSelector((store) => store.user.id);

  const recipe_type = useSelector(
    (store) => store.recipeReducer.specificRecipeTypeReducer
  );

  const recipePage = (recipe) => {
    dispatch({ type: "FETCH_RECIPE_PAGE_INFO", payload: recipe.id });
    dispatch({ type: "FETCH_RECIPE_INGREDIENTS", payload: recipe.id });
    dispatch({ type: "FETCH_RECIPE_INSTRUCTIONS", payload: recipe.id });
    dispatch({ type: "FETCH_SPECIFIC_RECIPE_TYPE", payload: recipe.id });
    //dispatch a get req to check if the recipe has been liked by the user
    // dispatch({
    //   type: "RESET_RECIPE_LIKE_STATUS"
    // })
    dispatch({ 
      type: "FETCH_RECIPE_LIKES", 
      payload: {
        userId: userId,
        recipeId: recipe.id
      } });
    // navigate to /details page
    history.push("/recipe-page");
  };

  return (
    <Card onClick={() => recipePage(props.recipe)}>
      {/* {JSON.stringify(props)} */}
      <img src={props.recipe.image_url} />
      <h3>{props.recipe.recipe_name}</h3>
      {/* will need to add conditional rendering for displaying hour & min info for prep time */}
      <p>
        {props.recipe.prep_hours} hours {props.recipe.prep_minutes} minutes
      </p>
    </Card>
  );
}

export default RecipeCard;
