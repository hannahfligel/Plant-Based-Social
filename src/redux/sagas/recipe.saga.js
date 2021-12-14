import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* recipeSaga() {
  yield takeLatest('FETCH_RECIPE_CARD_INFO', getRecipeCardInfo);
  yield takeLatest('FETCH_RECIPE_PAGE_INFO', getRecipePageInfo);
  yield takeLatest('FETCH_RECIPE_INGREDIENTS', getRecipeIngredients);
  yield takeLatest('FETCH_RECIPE_INSTRUCTIONS', getRecipeInstructions);
  yield takeLatest('FETCH_RECIPE_TYPES', getRecipeTypes);
  yield takeLatest('FETCH_SPECIFIC_RECIPE_TYPE', getSpecificRecipeType);
  yield takeLatest('FETCH_SAVED_RECIPES', getSavedRecipes)
}


function *getRecipeCardInfo(action){
    console.log('----->in getRecipeCardInfo', action)
    try{
        const response = yield axios.get (`/api/recipes/recipeCardInfo`)
        console.log('back from recipeCardInfo get:', response.data);
        yield put({ 
            type: 'SET_RECIPE_CARD_INFO',
            payload: response.data
        })
    } catch( err ){
        alert( 'no' );
        console.log( err );
      }
}

function *getRecipePageInfo(action){
  console.log('----->in getRecipePageInfo', action)
  try{
      const response = yield axios.get (`/api/recipes/recipePageInfo`)
      console.log('back from getRecipePageInfo get:', response.data);
      yield put({ 
          type: 'SET_RECIPE_PAGE_INFO',
          payload: response.data
      })
  } catch( err ){
      alert( 'no' );
      console.log( err );
    }
}


function *getRecipeIngredients(action){
  console.log('----->in getRecipeIngredients', action)
  try{
      const response = yield axios.get (`/api/recipes/ingredients`)
      console.log('back from getRecipeIngredients get:', response.data);
      yield put({ 
          type: 'SET_RECIPE_INGREDIENTS',
          payload: response.data
      })
  } catch( err ){
      alert( 'no' );
      console.log( err );
    }
}


function *getRecipeInstructions(action){
  console.log('----->in getRecipeInstructions', action)
  try{
      const response = yield axios.get (`/api/recipes/instructions`)
      console.log('back from getRecipeInstructions get:', response.data);
      yield put({ 
          type: 'SET_RECIPE_INSTRUCTIONS',
          payload: response.data
      })
  } catch( err ){
      alert( 'no' );
      console.log( err );
    }
}



function *getRecipeTypes(action){
  console.log('----->in getRecipeTypes', action)
  try{
      const response = yield axios.get (`/api/recipes/recipe-types`)
      console.log('back from getRecipeTypes get:', response.data);
      yield put({ 
          type: 'SET_RECIPE_TYPES',
          payload: response.data
      })
  } catch( err ){
      alert( 'no' );
      console.log( err );
    }
}

function *getSpecificRecipeType(action){
  console.log('----->in getSpecificRecipeType', action)
  try{
    const response = yield axios.get (`/api/recipes/specific-recipe-type`)
    console.log('back from getSpecificRecipeType get:', response.data);
    yield put({ 
        type: 'SET_SPECIFIC_RECIPE_TYPE',
        payload: response.data
    })
} catch( err ){
    alert( 'no' );
    console.log( err );
  }
}


function *getSavedRecipes(action){
    console.log('----->in getSavedRecipes', action)
    try{
      const response = yield axios.get (`/api/recipes/saved-recipes`)
      console.log('back from getSavedRecipes get:', response.data);
      yield put({ 
          type: 'SET_SAVED_RECIPES',
          payload: response.data
      })
  } catch( err ){
      alert( 'no' );
      console.log( err );
    }
}

export default recipeSaga;
