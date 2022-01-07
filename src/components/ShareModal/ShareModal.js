import {
  Modal,
  Alert,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareSquare,
  faUserCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../ShareModal/ShareModal.css";

function ShareModal(props) {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const userIcon = <FontAwesomeIcon icon={faUserCircle} />;

  const shareIcon = <FontAwesomeIcon icon={faShareSquare} />;

  const searchIcon = <FontAwesomeIcon icon={faSearch} />;

  const shareButton = () => {
    setShow(true);
    dispatch({
      type: "FETCH_ALL_USERS",
    });
  };

  //searchForUser takes in the arg of typedSearch that gets filled out in the search input
  const searchForUser = (typedSearch) => {
    console.log(typedSearch);
    //if the search input is empty, get all users to display
    if (typedSearch === "") {
      dispatch({
        type: "FETCH_ALL_USERS",
      });
      //else, display the specific user searched for
    } else {
      //dispatch FETCH_SEARCHED_USER with the payload of what the user typed in
      dispatch({
        type: "FETCH_SEARCHED_USER",
        payload: typedSearch,
      });
    }
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

            <InputGroup className="shareModalSearchInputGroup">
              <FormControl
                //onChange, fire off the searchForUser function and give it the arg of whatever the user types into the input field
                onChange={() => searchForUser(event.target.value)}
                className="shareModalInput"
                placeholder="Search by name"
                aria-label="Search by name"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text className="shareIcon" id="basic-addon2">
                {searchIcon}
              </InputGroup.Text>
            </InputGroup>

            {/* <FormControl className="seachInput" placeholder="Search by Name"  /> */}
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
          <Alert className="shareModalAlert" show={alertShow} variant="success">
            Recipe shared!
          </Alert>
        </Modal.Body>
        <Modal.Footer className="shareModalFooter">
          {/* <Button onClick={handleClose}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShareModal;
