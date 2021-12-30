import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "../RecipePage/RecipePage.css";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EditRecipeButton with the name for the new component.
function EditRecipeButton(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const history = useHistory();

  const editIcon = <FontAwesomeIcon icon={faEdit} />;

  const editRecipe = () => {
    history.push(`/add-recipe/${props.recipe_id}`);
  };

  return (
    <Link
      to="/add-recipe"
      className="editIcon recipePageHeaderIcon"
      onClick={editRecipe}
    >
      {editIcon}
    </Link>
  );
}

export default EditRecipeButton;
