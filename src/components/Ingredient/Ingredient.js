import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../RecipePage/RecipePage.css";
import { Container, Row, Col } from "react-bootstrap";
import "../AddRecipe/AddRecipe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Ingredient(props) {
  const dispatch = useDispatch();

  const deleteIcon = <FontAwesomeIcon icon={faTimes} />;

  //deleteIngredient deletes a specific ingredient from the db and then get the updated ingredients for the specific recipe after deleting (this allows the list to be updated automatically rather than having to reload the page after each delete)
  const deleteIngredient = () => {
    console.log("Delete button clicked");
    //this dispatch deletes the specific ingredient from the db using the ingredientId
    dispatch({
      type: "DELETE_INGREDIENT",
      payload: {
        ingredientId: props.ingredientId,
        recipeId: props.recipeId,
      }, //<--ingredientId is coming from AppRecipe via props and holds the specific ingredient id
    });
    //this dispatch gets the recipe ingredients from from the db using the recipeId
    // dispatch({
    //   type:"FETCH_RECIPE_INGREDIENTS",
    //   payload: props.recipeId//<--recipeId is coming from AppRecipe via props and holds the specific recipe id
    // })
  };

  return (
    <Row>
      <div className="ingredientsAndAmount addRecipeListItem">
        {!props.editMode && (
          //if it is, display the delete button next to each ingredient
          <Col className="ingredientsContainer" xs="1">
            <input className="checkbox" type="checkbox" name="check" />
          </Col>
        )}
        <Col className="ingredientsContainer" xs="7">
          {props.ingredientName}
        </Col>
        <Col className="ingredientAmount ingredientsContainer" xs="2">
          <p className="ingredientP">{props.ingredientAmount}</p>
        </Col>

        {/* is editMode set to true? */}
        {props.editMode && (
          //if it is, display the delete button next to each ingredient
          <Col className="ingredientsContainer" xs="2">
            <button
              className="deleteIngredientAndInstructionsButton"
              onClick={deleteIngredient}
            >
              delete
            </button>
          </Col>
        )}
      </div>
    </Row>
  );
}

export default Ingredient;
