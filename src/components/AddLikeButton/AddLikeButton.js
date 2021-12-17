import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useDropdownItem } from "@restart/ui/esm/DropdownItem";


function AddLikeButton(props) {

  const dispatch = useDispatch();

  const recipeId = props.recipeId

  const userId = useSelector((store) => store.user.id);


 const addLike = () => {
    dispatch({ type: "ADD_NEW_LIKE", 
    payload: {
      userId: userId,
      recipeId: recipeId
    } });
  };


  return (
    <div>
    <button className="AddLikeButton" onClick={addLike}>
      Like
    </button>
        </div>

  );
}

export default AddLikeButton;
