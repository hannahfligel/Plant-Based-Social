import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useDropdownItem } from "@restart/ui/esm/DropdownItem";

function AddLikeButton(props) {
  const dispatch = useDispatch();

  const recipeId = props.recipeId;

  const likedStatus = useSelector((store)=>store.recipeReducer.likedStatusReducer)

  const userId = useSelector((store) => store.user.id);

  const deleteLike = () => {
    console.log("delete like button clicked========>",likedStatus.id )
    dispatch({
      type: "DELETE_LIKE",
      payload: {
        likedStatusId: likedStatus[0].id,
        userId: userId,
        recipeId: recipeId,
      }
    })
  }

  const addLike = () => {
    dispatch({
      type: "ADD_NEW_LIKE",
      payload: {
        userId: userId,
        recipeId: recipeId,
      },
    });
  };

  return (
    <div>
      {/* if likedStatus > 0  */}
      {/* {JSON.stringify(likedStatus.count)} */}
      {likedStatus.length > 0 ?
      <button onClick={deleteLike}>
        Dislike
      </button>
      //else, show the dislike button 
      :
      <button onClick={addLike}>
        Like
      </button>
      }
    </div>
  );
}

export default AddLikeButton;
