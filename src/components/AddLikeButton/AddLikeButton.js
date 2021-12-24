import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useDropdownItem } from "@restart/ui/esm/DropdownItem";

function AddLikeButton(props) {
  const dispatch = useDispatch();

  const recipeId = props.recipeId;

  const likedStatus = useSelector((store)=>store.recipeReducer.likedStatusReducer)

  const userId = useSelector((store) => store.user.id);

  //onClick of the deleteLike button, dispatch DELETE_LIKE 
  const deleteLike = () => {
    console.log("delete like button clicked========>",likedStatus.id )
    dispatch({
      type: "DELETE_LIKE",
      payload: {
        // the likedStatusId payload holds the likesStatus at 0th index.id 
        likedStatusId: likedStatus[0].id,
        userId: userId,
        recipeId: recipeId,
      }
    })
  }

  //dispatch ADD_NEW_LIKE with the payload of userId (coming from the store) & recipeId (coming from RecipePage that got it from the store)
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
      {/* if the length of the likedStatus array is greater than 0, display the dislike button */}
      {likedStatus.length > 0 ?
      <button onClick={deleteLike}>
        Dislike
      </button>
      //else, display the like button (on the click of it, add a like to the likedStatus array)
      :
      <button onClick={addLike}>
        Like
      </button>
      }
    </div>
  );
}

export default AddLikeButton;
