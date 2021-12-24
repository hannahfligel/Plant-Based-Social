import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function ShareModal() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const shareButton = () => {
    setShow(true);
    dispatch({
      type: "FETCH_ALL_USERS",
    });
  };

  const allUsers = useSelector((store) => store.recipeReducer.allUsersReducer);

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
                  <li>{user.username}</li>
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
