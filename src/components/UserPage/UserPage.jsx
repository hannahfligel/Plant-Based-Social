import LogOutButton from "../LogOutButton/LogOutButton";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeTypeButtons from "../RecipeTypeButtons/RecipeTypeButtons";
import { propTypes } from "react-bootstrap/esm/Image";
import RecipeCard from "../RecipeCard/RecipeCard";
import Nav from "../Nav/Nav";
import { Button, Container } from "react-bootstrap";
import "../UserPage/UserPage.css";

function UserPage() {
  const dispatch = useDispatch();

  //recipeTypes holds all the recipe types from the store
  const recipeTypes = useSelector(
    (store) => store.recipeReducer.recipeTypesReducer
  );
  //recipeCardInfo hold all the info for the recipe card from the store
  const recipeCardInfo = useSelector(
    (store) => store.recipeReducer.recipeCardReducer
  );

  useEffect(() => {
    //on pageLoad, FETCH_RECIPE_CARD_INFO gets all the recipe card info
    dispatch({ type: "FETCH_RECIPE_CARD_INFO" });
    //on pageLoad, FETCH_RECIPE_TYPES gets all the recipe types
    dispatch({ type: "FETCH_RECIPE_TYPES" });
  }, []);

  //allButton shows all recipes on the click of the all button
  const allButton = () => {
    dispatch({ type: "FETCH_RECIPE_CARD_INFO" });
  };

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="userPageContainer">
      <Container>
        <h1 className="usePageH1">Hello {user.username}!</h1>
        <p className="usePageP">What do you want to cook today?</p>
      </Container>

      <div className="filterByMeal">
        <Container>
          <h3>Filter by meal</h3>

          <div className="filterButtonsContainer">
            {/* map though recipeTypes. For every individual recipeType, return a button with the name of the recipe type */}
            <button className="filterButtons" onClick={allButton}>
              All
            </button>
            {recipeTypes.map((recipeType) => {
              return (
                //render the RecipeTypeButtons component and pass down the name of the recipe type to it as "name" and the id as "id"
                <RecipeTypeButtons
                  key={recipeType.id}
                  name={recipeType.recipe_type}
                  id={recipeType.id}
                />
              );
            })}
          </div>
        </Container>
      </div>
      <Container>
        <div>
          {/* <h3>Recipes</h3> */}
          <div className="recipeCardContainer">
            {/* map through recipeCardInfo and send each recipe card info via props to the recipeCard component to individually be displayed on the DOM */}
            {recipeCardInfo.map((recipeCard) => {
              return <RecipeCard key={recipeCard.id} recipe={recipeCard} />;
            })}
          </div>
        </div>
      </Container>
      <Nav />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
