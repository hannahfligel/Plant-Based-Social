import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function ShareModal(props) {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const shareButton = () => {
    setShow(true);
    dispatch({
      type: "FETCH_ALL_USERS",
    });
  };

  //use.id value is sent to the receiver_id
  const shareRecipe = (receiver_id) => {
      console.log("recipeId=====>", props.recipeId)
      console.log("receiver_id====>", receiver_id)
      console.log("userId=====>", user.id)
      dispatch ({
          type: "POST_SHARE_RECIPE",
          payload:{
              recipeId: props.recipeId,
              receiverId: receiver_id,
              userId: user.id
          }
      })

  }

  const allUsers = useSelector((store) => store.recipeReducer.allUsersReducer);

  const user = useSelector((store) => store.user);


  return (
    <>
      <Button variant="primary" onClick={shareButton}>
        Share
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send on Plant Based Social</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {allUsers.map((user) => {
              return (
                <div key={user.id}>
                    <li>
                        {user.username}
                        {/* onClick of the share button, run the shareRecipe function and give it the argument of the specific users id (the receiver) */}
                        <Button onClick={()=>shareRecipe(user.id)}>share</Button>
                    </li>
                </div>
              );
            })}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShareModal;
