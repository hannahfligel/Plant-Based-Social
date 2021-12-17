import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useHistory } from "react-router-dom";


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AddRecipe with the name for the new component.
function AddRecipe(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const dispatch = useDispatch();


  const recipeTypes = useSelector((store) => store.recipeReducer.recipeTypesReducer);

  const [newRecipe, setNewRecipe] = useState({
    recipe_type_id: 0, //<-- since genre will be placed into the movies_genres junction table, only the id is needed rather than the name
  });

  useEffect(() => {
    dispatch({ type:"FETCH_RECIPE_TYPES"});
  }, []);

  return (
    <div>
        <h2>Image upload</h2>
        <input Placeholder="Recipe name"/>
        <textarea Placeholder="recipe description"/>
        



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

    </div>
  );
}

export default AddRecipe;
