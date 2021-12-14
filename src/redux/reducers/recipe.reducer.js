import { combineReducers } from 'redux';


const recipeCardReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_RECIPE_CARD_INFO':
        return action.payload;
      default:
        return state;
    }
  };


const recipePageReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPE_PAGE_INFO':
      return action.payload[0];
    default:
      return state;
  }
};


const recipeIngredientsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPE_INGREDIENTS':
      return action.payload;
    default:
      return state;
  }
};

const recipeInstructionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPE_INSTRUCTIONS':
      return action.payload;
    default:
      return state;
  }
};

const recipeTypesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECIPE_TYPES':
      return action.payload;
    default:
      return state;
  }
};


const specificRecipeTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SPECIFIC_RECIPE_TYPE':
      return action.payload[0];
    default:
      return state;
  }
};



const savedRecipesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SAVED_RECIPES':
      return action.payload;
    default:
      return state;
  }
};


  
  // user will be on the redux state at:
  // state.user

  export default combineReducers({
    recipeCardReducer,
    recipePageReducer,
    recipeIngredientsReducer,
    recipeInstructionsReducer,
    recipeTypesReducer,
    specificRecipeTypeReducer,
    savedRecipesReducer,
  });
  