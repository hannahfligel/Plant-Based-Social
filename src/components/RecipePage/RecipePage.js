import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Ingredient from "../Ingredient/Ingredient";
import Instruction from "../Instruction/Instruction";
import AddLikeButton from "../AddLikeButton/AddLikeButton";
import EditRecipeButton from "../EditRecipeButton/EditRecipeButton";
import ShareModal from "../ShareModal/ShareModal";
import Button from "react-bootstrap/Button";
import Nav from "../Nav/Nav";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import "../RecipePage/RecipePage.css";
import Checkbox from "../Checkbox/Checkbox";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name RecipePage with the name for the new component.
function RecipePage(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const backIcon = <FontAwesomeIcon icon={faArrowLeft} />;
  const editIcon = <FontAwesomeIcon icon={faEdit} />;

  const user = useSelector((store) => store.user);

  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const ingredients = useSelector(
    (store) => store.recipeReducer.recipeIngredientsReducer
  );

  const recipe_type = useSelector(
    (store) => store.recipeReducer.specificRecipeTypeReducer
  );
  const store = useSelector((store) => store);

  //recipeGeneralInfo hold all everything on the form other than ingredients, instructions, and recipe types
  const recipeGeneralInfo = useSelector(
    (store) => store.recipeReducer.recipePageReducer
  );

  const likedStatus = useSelector(
    (store) => store.recipeReducer.likedStatusReducer
  );

  const instructions = useSelector(
    (store) => store.recipeReducer.recipeInstructionsReducer
  );
  // const likes = useSelector(
  //   (store) => store.recipeReducer.recipePageReducer.likes
  // );

  const [heading, setHeading] = useState("Recipe");

  return (
    <>
      <div>
        <Container className="headerIconsContainer">
          <span
            className="recipePageHeaderIcon"
            onClick={() => history.goBack()}
          >
            {backIcon}
          </span>
          <div>
            {/* conditionally render to only show the edit button if an admin is logged in */}
            {user.admin && (
              <EditRecipeButton recipe_id={recipeGeneralInfo.id} />
            )}
            <ShareModal recipeId={recipeGeneralInfo.id} />
          </div>
        </Container>
      </div>

      <img className="recipePageImage" src={recipeGeneralInfo.image_url} />

      <div className="recipeInfoContainer">
        <Container className="RecipePageContainer">
          <AddLikeButton recipeId={recipeGeneralInfo.id} />

          <Row className="recipePageBasicInfoContainer">
            <Col className="recipePageCol">
              <p className="recipePageBasicInfoP">
                {recipeGeneralInfo.difficulty}
              </p>
            </Col>
            {/* if the prep time if greater then 1 hour, display num hours */}
            <Col className="recipePagePrepTime recipePageCol">
              {recipeGeneralInfo.prep_hours > 1 && (
                <p className="recipePageHours recipePageBasicInfoP">
                  {recipeGeneralInfo.prep_hours}hrs
                </p>
              )}
              {/* else the prep time if greater then 1 hour, display num hour */}
              {recipeGeneralInfo.prep_hours === 1 && (
                <p className="recipePageHours recipePageBasicInfoP">
                  {recipeGeneralInfo.prep_hours}hr
                </p>
              )}

              {recipeGeneralInfo.prep_minutes > 1 && (
                <p className="recipePageBasicInfoP">
                  {recipeGeneralInfo.prep_minutes}min
                </p>
              )}
            </Col>
            <Col className="recipePageCol">
              {recipeGeneralInfo.servings === 1 && (
                <p className="recipePageBasicInfoP">
                  {recipeGeneralInfo.servings} serving
                </p>
              )}

              {recipeGeneralInfo.servings > 1 && (
                <p className="recipePageBasicInfoP">
                  {recipeGeneralInfo.servings} servings
                </p>
              )}
              {/* 
              <p className="recipePageServings">
                {recipeGeneralInfo.servings} serving
              </p> */}
            </Col>
          </Row>

          <h1 className="recipePageH1">{recipeGeneralInfo.recipe_name}</h1>
          <p className="RecipePageDescription">
            {recipeGeneralInfo.recipe_description}
          </p>

          <hr className="solid" />

          <h2 className="RecipePageH2">Ingredients</h2>

          <div className="RecipePageLists">
            {ingredients.map((ingredient) => {
              return (
                <Ingredient
                  key={ingredient.id}
                  ingredientName={ingredient.ingredient}
                  ingredientAmount={ingredient.ingredient_amount}
                  ingredientId={ingredient.id}
                  editMode={false}
                />
              );
            })}
          </div>

          <h2 className="RecipePageH2">Instructions</h2>
          <ol className="RecipePageLists">
            {instructions.map((instruction) => {
              return (
                <Instruction
                  key={instruction.id}
                  instructionName={instruction.instruction}
                  instructionId={instruction.id}
                  editMode={false} // <--- editMode determines whether or not the delete buttons show up
                />
              );
            })}
          </ol>
        </Container>
      </div>
      <Nav />
    </>
  );
}

export default RecipePage;
