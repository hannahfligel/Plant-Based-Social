import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useHistory } from "react-router-dom";
import Ingredient from "../Ingredient/Ingredient";
import Instruction from "../Instruction/Instruction";
import DeleteRecipeButton from "../DeleteRecipeButton/DeleteRecipeButton";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AddRecipe with the name for the new component.
function AddRecipe(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const history = useHistory();

  const store = useSelector((store) => store);

  useEffect(() => {
    dispatch({
      type: "FETCH_RECIPE_TYPES",
    });
  }, []);

  const recipeTypes = useSelector(
    (store) => store.recipeReducer.recipeTypesReducer
  );

  const ingredients = useSelector(
    (store) => store.recipeReducer.recipeIngredientsReducer
  );

  const instructions = useSelector(
    (store) => store.recipeReducer.recipeInstructionsReducer
  );

  const recipeInfo = useSelector(
    (store) => store.recipeReducer.recipePageReducer
  );

  //useState stores values coming from the reducers in the store
  const [newRecipe, setNewRecipe] = useState({
    image_url: "",
    recipe_name: "",
    recipe_description: "",
    difficulty: 1,
    prep_hours: 0,
    prep_minutes: 0,
    servings: 0,
    recipe_type_id: 0,
  });

  const [newIngredient, setNewIngredient] = useState({
    ingredient: "",
    ingredient_amount: "",
  });

  const [newInstruction, setNewInstruction] = useState("");

  const back = () => {
    history.push("/user");
  };

  const submit = async() => {
    console.log("Submit new recipe---->", newRecipe);
    await dispatch({
      type: "UPDATE_RECIPE",
      payload: {
        newRecipe: newRecipe,
        id: recipeInfo.id,
      },
    });
    await history.push('/home');
  };

  const addIngredient = () => {
    console.log("New Ingredient------>", newIngredient);
    dispatch({
      type: "ADD_INGREDIENT",
      payload: {
        newIngredient: newIngredient,
        id: recipeInfo.id,
      },
    });
    setNewIngredient({
      ingredient: "",
      ingredient_amount: ""
    })
    dispatch({
      type: "FETCH_RECIPE_INGREDIENTS",
      payload: recipeInfo.id,
    });
  };

  const addInstruction = () => {
    console.log("New Instruction------>", newInstruction);
    dispatch({
      type: "ADD_INSTRUCTION",
      payload: {
        newInstruction: newInstruction,
        id: recipeInfo.id,
      },
    });
    setNewInstruction({
      instruction: ""
    })
    dispatch({
      type: "FETCH_RECIPE_INSTRUCTIONS",
      payload: recipeInfo.id,
    });
  };

  return (
    <div>
      {JSON.stringify(recipeInfo.id)}
      {JSON.stringify(newRecipe.id)}
      {/* currently goes back to the /user page */}
      <button onClick={back}>BACK</button>
      {/*<--- need to create modal to delete recipe from db that will pop up on the click of back button */}

      {/* input for image_url */}
      {/* defaultValue holders the the value of the useState that came from the store  */}
      <input
        onChange={(event) =>
          setNewRecipe({ ...newRecipe, image_url: event.target.value })
        }
        placeholder="Recipe image url"
        defaultValue={recipeInfo.image_url}
      />

      {/* input for recipe_name */}
      <input
        onChange={(event) =>
          setNewRecipe({ ...newRecipe, recipe_name: event.target.value })
        }
        placeholder="Recipe name"
        defaultValue={recipeInfo.recipe_name}
      />

      {/* input for recipe_description */}
      <textarea
        onChange={(event) =>
          setNewRecipe({ ...newRecipe, recipe_description: event.target.value })
        }
        placeholder="recipe description"
        defaultValue={recipeInfo.recipe_description}
      />

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

      {/* difficulty dropdown */}
      <label htmlFor="recipeInput">
        difficulty
        <select
          onChange={(event) =>
            setNewRecipe({ ...newRecipe, difficulty: event.target.value })
          }
          defaultValue={recipeInfo.difficulty}
        >
          <option>Select</option>
          <option value="1">Easy</option>
          <option value="2">Intermediate</option>
          <option value="3">Difficult</option>
        </select>
      </label>

      {/* prep time input (hours & minutes) */}
      <label>
        prep time:
        <input
          onChange={(event) =>
            setNewRecipe({ ...newRecipe, prep_minutes: event.target.value })
          }
          placeholder="hours"
          type="number"
          defaultValue={recipeInfo.prep_minutes}
        />
        <input
          onChange={(event) =>
            setNewRecipe({ ...newRecipe, prep_hours: event.target.value })
          }
          placeholder="minutes"
          type="number"
          defaultValue={recipeInfo.prep_hours}
        />
      </label>

      {/* servings input */}
      <label>
        Servings:
        <input
          onChange={(event) =>
            setNewRecipe({ ...newRecipe, servings: event.target.value })
          }
          placeholder="servings"
          type="number"
          defaultValue={recipeInfo.servings}
        />
      </label>

      <h3>Ingredients</h3>
      <label>
        <input
          onChange={(event) =>
            setNewIngredient({
              ...newIngredient,
              ingredient: event.target.value,
            })
          }
          value={newIngredient.ingredient}
          placeholder="ingredient"
        />
        <input
          onChange={(event) =>
            setNewIngredient({
              ...newIngredient,
              ingredient_amount: event.target.value,
            })
          }
          value={newIngredient.ingredient_amount}
          placeholder="amount"
        />
      </label>
      <button onClick={addIngredient}>Add Ingredient</button>
      <ul>
        {ingredients.map((ingredient) => {
          return (
            <Ingredient
              key={ingredient.id}
              ingredientName={ingredient.ingredient}
              ingredientAmount={ingredient.ingredient_amount}
              ingredientId={ingredient.id}
              editMode={true} // <--- editMode determines whether or not the delete buttons show up
              recipeId={recipeInfo.id}
            />
          );
        })}
      </ul>

      <h3>Instructions</h3>
      <label>
        <input
          onChange={(event) => setNewInstruction(event.target.value)}
          value={newInstruction.instruction}
          placeholder="instruction"
        />
      </label>

      <button onClick={addInstruction}>Add instruction</button>
      <ul>
        {instructions.map((instruction) => {
          return (
            <Instruction
              key={instruction.id}
              instructionName={instruction.instruction}
              instructionId={instruction.id}
              editMode={true}
              recipeId={recipeInfo.id}
            />
          );
        })}
      </ul>

      <button onClick={submit}>Submit recipe</button>
      <DeleteRecipeButton recipeId={recipeInfo.id} />
    </div>
  );
}

export default AddRecipe;
