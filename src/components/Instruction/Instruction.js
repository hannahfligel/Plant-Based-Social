import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Instruction(props) {

  const dispatch = useDispatch();


  const deleteInstruction = () => {
    console.log("Delete button clicked")
    dispatch({ 
      type: "DELETE_INSTRUCTION",
      payload: props.instructionId,
    });
    dispatch({
      type:"FETCH_RECIPE_INSTRUCTIONS",
      payload: props.recipeId//<--recipeId is coming from AppRecipe via props and holds the specific recipe id 
    })
  }

  return (
    <div>
      <li>
        {props.instructionName}
        {props.InstructionAmount}
        {/* is editMode set to true? */}
        {props.editMode && (
          //if it is, display the delete button next to each instruction
          <button onClick={deleteInstruction}>Delete</button>
        )}
      </li>
    </div>
  );
}

export default Instruction;
