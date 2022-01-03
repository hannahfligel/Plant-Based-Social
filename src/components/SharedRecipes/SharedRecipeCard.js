import React, { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../SharedRecipes/SharedRecipes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name SharedRecipeCard with the name for the new component.
function SharedRecipeCard(props) {
  const dispatch = useDispatch();

  const history = useHistory();

  const userId = useSelector((store) => store.user.id);

  const clock = <FontAwesomeIcon icon={faClock} />;

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
        recipeId: recipe.id,
      },
    });
    // navigate to /details page
    history.push("/recipe-page");
  };

  return (
    <Card className="SharedRecipeCard" onClick={() => recipePage(props.recipe)}>
      <Card.Img className="cardImg" src={props.recipe.image_url} />
      <div className="SharedRecipeCardBody">
        <h3 className="SharedRecipeCardName text">
          {props.recipe.recipe_name}
        </h3>
        <div className="cardHrsAndMins">
          <span className="clockIcon">{clock}</span>

          {/* if the prep time if greater then 1 hour, display num hours */}
          {props.recipe.prep_hours > 1 && (
            <p className="SharedRecipeCardPrepTime cardHours">
              {props.recipe.prep_hours}-hrs
            </p>
          )}
          {/* else the prep time if greater then 1 hour, display num hour */}
          {props.recipe.prep_hours === 1 && (
            <p className="SharedRecipeCardPrepTime cardHours">
              {props.recipe.prep_hours}-hr
            </p>
          )}

          {props.recipe.prep_minutes > 1 && (
            <p className="SharedRecipeCardPrepTime cardMin">
              {props.recipe.prep_minutes}-min
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

export default SharedRecipeCard;
