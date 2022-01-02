import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "../AddRecipe/AddRecipe.css";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name EditRecipeButton with the name for the new component.
function EditRecipeButton(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const history = useHistory();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userId = useSelector((store) => store.user.id);

  const deleteRecipe = async () => {
    console.log("IN DELETE RECIPE=====>", props.recipeId);
    await dispatch({
      type: "DELETE_RECIPE",
      payload: {
        recipeId: props.recipeId,
        userId: userId,
      },
    });
    await history.push("/home");
  };

  return (
    <div>
      <a tabindex="1" className="deleteRecipeLink" onClick={handleShow}>
        delete recipe
      </a>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="ModalTitle">Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          Are you sure you want to delete this recipe?
        </Modal.Body>
        <Modal.Footer className="deleteModalButtonsContainer">
          <Button
            className="btn-secondary deleteModalNoButton"
            onClick={handleClose}
          >
            No, keep recipe
          </Button>
          <Button className="deleteModalDeleteButton" onClick={deleteRecipe}>
            Yes, delete recipe
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditRecipeButton;
