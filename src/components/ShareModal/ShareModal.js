import { Button, Modal, Alert, Container } from "react-bootstrap";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareSquare, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "../ShareModal/ShareModal.css";
import context from "react-bootstrap/esm/AccordionContext";

function ShareModal(props) {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const userIcon = <FontAwesomeIcon icon={faUserCircle} />;

  const shareIcon = <FontAwesomeIcon icon={faShareSquare} />;

  const shareButton = () => {
    setShow(true);
    dispatch({
      type: "FETCH_ALL_USERS",
    });
  };

  //use.id value is sent to the receiver_id
  const shareRecipe = (receiver_id) => {
    console.log("recipeId=====>", props.recipeId);
    console.log("receiver_id====>", receiver_id);
    console.log("userId=====>", user.id);
    dispatch({
      type: "POST_SHARE_RECIPE",
      payload: {
        recipeId: props.recipeId,
        receiverId: receiver_id,
        userId: user.id,
      },
    });
    setAlertShow(true);
    setTimeout(() => {
      setAlertShow(false);
    }, 3000);
  };

  const [alertShow, setAlertShow] = useState(false);

  const allUsers = useSelector((store) => store.recipeReducer.allUsersReducer);

  const user = useSelector((store) => store.user);

  return (
    <>
      <span className="recipePageHeaderIcon" onClick={shareButton}>
        {shareIcon}
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="shareModalHeader" closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Container>
          <center>
            <h2 className="shareModalTitleH2">Share on Plant Based Social</h2>
            <hr />
          </center>
        </Container>

        <Modal.Body className="shareModalScroll">
          {allUsers.map((user) => {
            return (
              <div className="ShareModalUserContainer" key={user.id}>
                <div className="ShareRecipeUserNameAndIcon">
                  <span className="userIcon">{userIcon}</span>
                  {user.username}
                  {/* onClick of the share button, run the shareRecipe function and give it the argument of the specific users id (the receiver) */}
                </div>
                <button
                  className="modalShareButton"
                  onClick={() => shareRecipe(user.id)}
                >
                  share
                </button>
              </div>
            );
          })}
          <Alert show={alertShow} variant="success">
            Recipe shared!{" "}
          </Alert>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
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
