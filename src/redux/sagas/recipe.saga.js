import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* recipeSaga() {
  yield takeLatest('FETCH_RECIPE_CARD_INFO', getRecipeCardInfo);
}

function *getRecipeCardInfo(action){
    console.log('----->in getRecipeCardInfo')
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

export default recipeSaga;
