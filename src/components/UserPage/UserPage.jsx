import LogOutButton from '../LogOutButton/LogOutButton';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeTypeButtons from '../RecipeTypeButtons/RecipeTypeButtons';
import { propTypes } from 'react-bootstrap/esm/Image';
import RecipeCard from '../RecipeCard/RecipeCard';


function UserPage() {

  const dispatch = useDispatch();

  const recipeReducer = useSelector((store) => store.recipeReducer);
  const recipeTypes = useSelector((store) => store.recipeReducer.recipeTypesReducer);
  const recipeCardInfo = useSelector((store) => store.recipeReducer.recipeCardReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_RECIPE_CARD_INFO" });
    dispatch({ type:"FETCH_RECIPE_TYPES"});
  }, []);

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h1>Hello {user.username}!</h1>
      <p>What do you want to cook today?</p>
      {/* <p>Your ID is: {user.id}</p> */}
      {/* {JSON.stringify(recipeReducer)} */}
      <div>
        <h2>Filter by meal</h2>

        {/* map though recipeTypes. For every individual recipeType, return a button with the name of the recipe type */}
        {recipeTypes.map((recipeType) => {
                return (
                  //onClick, run the details function and passing it the individual movie info that was clicked on
                  //render the RecipeTypeButtons component and pass down the name of the recipe type to it as "name"
                  <RecipeTypeButtons key={recipeType.id} name={recipeType.recipe_type} id={recipeType.id}/>
                );
              })}
      </div>
      <div>
        <h2>Recipes</h2>
        {/* {JSON.stringify(recipeCardInfo)} */}
        {recipeCardInfo.map((recipeCard) => {
          return(
          <RecipeCard key={recipeCard.id} recipe={recipeCard} />
          );
        })}

      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
