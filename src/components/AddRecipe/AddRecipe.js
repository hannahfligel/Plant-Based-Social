import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useHistory } from "react-router-dom";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AddRecipe with the name for the new component.
function AddRecipe(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const history = useHistory();

  const store = useSelector((store) => store);

  const recipeTypes = useSelector(
    (store) => store.recipeReducer.recipeTypesReducer
  );

  const [newRecipe, setNewRecipe] = useState({
    recipe_type_id: 0, //<-- since genre will be placed into the movies_genres junction table, only the id is needed rather than the name
  });

  useEffect(() => {
    dispatch({ type: "FETCH_RECIPE_TYPES" });
  }, []);

  const back = () => {
    history.push("/user");
  };

  return (
    <div>
      {/* currently goes back to the userpage */}
      <button onClick={back}>BACK</button>{/*<--- need to create modal to delete recipe from db that will pop up on the click of back button */}

      <input placeholder="Recipe image url" />
      <input placeholder="Recipe name" />
      <textarea placeholder="recipe description" />

      {/* recipe type dropdown */}
      <label htmlFor="recipeInput">
        recipe type
        <select
          onChange={(event) =>
            setNewRecipe({ ...newRecipe, recipe_type_id: event.target.value })
          }
          id="recipeInput"
          name="Recipe type"
        >
          <option>select recipe type</option>
          {recipeTypes.map((recipeType) => {
            return (
              //onClick, run the details function and passing it the individual movie info that was clicked on
              <option value={recipeType.id} key={recipeType.id}>
                {recipeType.recipe_type}
              </option>
            );
          })}
        </select>
      </label>

      <label htmlFor="recipeInput">
        difficulty
        <select>
          <option>Select</option>
          <option>Easy</option>
          <option>Intermediate</option>
          <option>Difficult</option>
        </select>
      </label>
      
      <label>
        prep time:
          <input placeholder="hours" type="number"/>
          <input placeholder="minutes" type="number"/>
      </label>

      <label>
        Servings:
          <input placeholder="servings" type="number"/>
      </label>

      <h3>Ingredients</h3>
      <label>
          <input placeholder="ingredient"/>
          <input placeholder="amount"/>
      </label>
      <button>Add ingredient</button>

      <h3>Instructions</h3>
      <label>
          <input placeholder="instruction"/>
          <input placeholder="amount"/>
      </label>
      <button>Add instruction</button>

      <button>Submit recipe</button>

    </div>
  );
}

export default AddRecipe;
