import axios from "axios";
import { use } from "passport";
import { put, takeLatest, takeEvery } from "redux-saga/effects";
// import { useHistory } from "react-router";

// const history = useHistory();

function* recipeSaga() {
  yield takeEvery("FETCH_RECIPE_CARD_INFO", getRecipeCardInfo);
  yield takeEvery("FETCH_RECIPE_PAGE_INFO", getRecipePageInfo);
  yield takeEvery("FETCH_RECIPE_INGREDIENTS", getRecipeIngredients);
  yield takeEvery("FETCH_RECIPE_INSTRUCTIONS", getRecipeInstructions);
  yield takeEvery("FETCH_RECIPE_TYPES", getRecipeTypes);
  yield takeEvery("FETCH_SPECIFIC_RECIPE_TYPE", getSpecificRecipeType);
  yield takeEvery("FETCH_SAVED_RECIPES", getSavedRecipes);
  yield takeEvery("ADD_NEW_LIKE", addLike);
  yield takeEvery("FETCH_RECIPES_BY_TYPE", getRecipesByType);
  yield takeEvery("ADD_RECIPE", addRecipe);
  yield takeEvery("UPDATE_RECIPE", updateRecipe);
  yield takeEvery("ADD_INSTRUCTION", addInstruction);
  yield takeEvery("ADD_INGREDIENT", addIngredient);
  yield takeEvery("DELETE_INSTRUCTION", deleteInstruction);
  yield takeEvery("DELETE_INGREDIENT", deleteIngredient);
  yield takeEvery("DELETE_RECIPE", deleteRecipe);

  //   yield takeEvery('DELETE_INGREDIENT', deleteIngredient);
}


function *deleteRecipe(action){
  console.log("in deleteRecipe", action.payload);
  try {
    const response = yield axios.delete(
      `/api/recipes/delete-recipe/${action.payload}`
    );
  } catch (error) {
    console.log("get request failed", error);
  }
}

function *deleteIngredient(action) {
  console.log("in deleteIngredient", action.payload);
  try {
    const response = yield axios.delete(
      `/api/recipes/delete-ingredient/${action.payload.ingredientId}`
    );
    yield put({
      type: "FETCH_RECIPE_INGREDIENTS",
      payload: action.payload.recipeId,
    });
  } catch (error) {
    console.log("get request failed", error);
  }
}

function* deleteInstruction(action) {
  // console.log('in deleteInstruction', action.payload)
  console.log("in deleteInstruction", action.payload);
  try {
    const response = yield axios.delete(
      `/api/recipes/delete-instruction/${action.payload}`
    );
    // yield put({
    //     type:'FETCH_RECIPE_INSTRUCTIONS',
    //     payload: response.data
    // })
  } catch (error) {
    console.log("get request failed", error);
  }
}

function* addLike(action) {
  console.log("in addLike---->", action.payload);
  try {
    const response = yield axios.post("/api/recipes/add-like", action.payload);
  } catch (error) {
    console.log("get request failed", error);
  }
}

function* addRecipe(action) {
  console.log("in addRecipe------>", action.payload);
  try {
    const response = yield axios.post(
      "/api/recipes/add-recipe",
      action.payload
    );
    //run the getRecipePageInfo recipe function to get the new recipe's information and save it in the store
    //send response.data.id that holds the id of the new created recipe
    console.log("BACK FROM SERVER------>", response.data);
    yield put({
      type: "SET_RECIPE_PAGE_INFO",
      payload: response.data,
    });
  } catch (error) {
    console.log("get request failed", error);
  }
}

function* addInstruction(action) {
  console.log("in addInstruction=====>", action.payload);
  try {
    const response = yield axios.post(
      "/api/recipes/add-instruction",
      action.payload
    );
    console.log("BACK FROM SERVER------>", response.data);
    yield put({
      type: "FETCH_RECIPE_INSTRUCTIONS",
      payload: action.payload.id,
    });
  } catch (error) {
    console.log("get request failed", error);
  }
}

function* addIngredient(action) {
  console.log("in addIngredient=====>", action.payload.id);
  try {
    const response = yield axios.post(
      "/api/recipes/add-ingredient",
      action.payload
    );
    console.log("BACK FROM SERVER------>", response.data);
    yield put({
      type: "FETCH_RECIPE_INGREDIENTS",
      payload: action.payload.id,
    });
  } catch (error) {
    console.log("get request failed", error);
  }
}

function* getRecipesByType(action) {
  // action.payload holds the recipe type's id
  console.log("in getRecipesByType", action.payload);
  try {
    //perform an axios get req to send the id (action.payload) of the recipe type to only receive the recipes that fall under that recipe type
    const response = yield axios.get(
      `/api/recipes/recipeCardInfo/${action.payload}`
    );
    console.log("back from recipeCardInfo get:", response.data);
    //dispatch SET_RECIPE_CARD_INFO' with the payload of what was sent back from the db
    //this will replace whatever was in
    yield put({
      type: "SET_RECIPE_CARD_INFO",
      payload: response.data,
    });
  } catch (err) {
    alert("no");
    console.log(err);
  }
}

function* getRecipeCardInfo(action) {
  console.log("----->in getRecipeCardInfo", action.payload);
  try {
    const response = yield axios.get(`/api/recipes/recipeCardInfo`);
    console.log("back from recipeCardInfo get:", response.data);
    yield put({
      type: "SET_RECIPE_CARD_INFO",
      payload: response.data,
    });
  } catch (err) {
    alert("no");
    console.log(err);
  }
}

function* getRecipePageInfo(action) {
  console.log("----->in getRecipePageInfo", action.payload);
  try {
    //   yield put({
    //       type: 'SET_RECIPE_PAGE_INFO',
    //       payload: {}
    //   })
    const response = yield axios.get(
      `/api/recipes/recipePageInfo/${action.payload}`
    );
    console.log("back from getRecipePageInfo get:", response.data);
    yield put({
      type: "SET_RECIPE_PAGE_INFO",
      payload: response.data,
    });
  } catch (err) {
    alert("no");
    console.log(err);
  }
}

function* getRecipeIngredients(action) {
  console.log("----->in getRecipeIngredients", action);
  try {
    const response = yield axios.get(
      `/api/recipes/ingredients/${action.payload}`
    );
    console.log("back from getRecipeIngredients get:", response.data);
    yield put({
      type: "SET_RECIPE_INGREDIENTS",
      payload: response.data,
    });
  } catch (err) {
    alert("no");
    console.log(err);
  }
}

function* getRecipeInstructions(action) {
  console.log("----->in getRecipeInstructions", action);
  try {
    const response = yield axios.get(
      `/api/recipes/instructions/${action.payload}`
    );
    console.log("back from getRecipeInstructions get:", response.data);
    yield put({
      type: "SET_RECIPE_INSTRUCTIONS",
      payload: response.data,
    });
  } catch (err) {
    alert("no");
    console.log(err);
  }
}

function* getRecipeTypes(action) {
  console.log("----->in getRecipeTypes", action);
  try {
    const response = yield axios.get(`/api/recipes/recipe-types`);
    console.log("back from getRecipeTypes get:", response.data);
    yield put({
      type: "SET_RECIPE_TYPES",
      payload: response.data,
    });
  } catch (err) {
    alert("no");
    console.log(err);
  }
}

function* getSpecificRecipeType(action) {
  console.log("----->in getSpecificRecipeType", action);
  try {
    const response = yield axios.get(`/api/recipes/specific-recipe-type`);
    console.log("back from getSpecificRecipeType get:", response.data);
    yield put({
      type: "SET_SPECIFIC_RECIPE_TYPE",
      payload: response.data,
    });
  } catch (err) {
    alert("no");
    console.log(err);
  }
}

function* getSavedRecipes(action) {
  console.log("----->in getSavedRecipes", action);
  try {
    const response = yield axios.get(`/api/recipes/saved-recipes`);
    console.log("back from getSavedRecipes get:", response.data);
    yield put({
      type: "SET_SAVED_RECIPES",
      payload: response.data,
    });
  } catch (err) {
    alert("no");
    console.log(err);
  }
}

function* updateRecipe(action) {
  console.log("UPDATED RECIPE--->", action.payload.id);
  try {
    const updatedRecipe = yield axios.put(
      `/api/recipes/update-recipe/${action.payload.id}`,
      action.payload
    );
  } catch {
    console.log("update recipe error");
  }
}

export default recipeSaga;
