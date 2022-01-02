import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../AddRecipe/AddRecipe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Instruction(props) {
  const dispatch = useDispatch();

  const deleteIcon = <FontAwesomeIcon icon={faTimes} />;

  const deleteInstruction = () => {
    console.log("Delete button clicked");
    dispatch({
      type: "DELETE_INSTRUCTION",
      payload: props.instructionId,
    });
    dispatch({
      type: "FETCH_RECIPE_INSTRUCTIONS",
      payload: props.recipeId, //<--recipeId is coming from AppRecipe via props and holds the specific recipe id
    });
  };

  return (
    <li className="addRecipeListItem">
      {props.instructionName}
      {props.InstructionAmount}
      {/* is editMode set to true? */}
      {props.editMode && (
        //if it is, display the delete button next to each instruction
        <button
          className="deleteIngredientAndInstructionsButton"
          onClick={deleteInstruction}
        >
          delete
        </button>
      )}
    </li>
  );
}

export default Instruction;
