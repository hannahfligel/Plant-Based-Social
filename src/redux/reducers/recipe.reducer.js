import { combineReducers } from 'redux';

//on page load, recipeCardReducer hold all the recipes. 
//on the click of a filter button, it gets replaced with the specific recipes depending on the type selected 
//recipeCardReducer holds all the recipes on we see on the home page 
const recipeCardReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_RECIPE_CARD_INFO':
        return action.payload;
      default:
        return state;
    }
  };

//recipePageReducer stores the specific recipe's information 
const recipePageReducer = (state = [], action) => {
  switch (action.type) {
    //case 1 empties out the reducer of the add recipe form 
    case 'RESET_RECIPE_PAGE_INFO':
      return [];
    //case 2 sets the input fields to an empty array 
    case 'SET_RECIPE_PAGE_INFO':
      return action.payload[0];
    default:
      return state;
  }
};


const recipeIngredientsReducer = (state = [], action) => {
  switch (action.type) {
    case'RESET_RECIPE_INGREDIENTS':
      return [];
    case 'SET_RECIPE_INGREDIENTS':
      return action.payload;
    default:
      return state;
  }
};

const recipeInstructionsReducer = (state = [], action) => {
  switch (action.type) {
    case'RESET_RECIPE_INSTRUCTIONS':
    return [];
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



const likedRecipesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LIKED_RECIPES':
      return action.payload;
    default:
      return state;
  }
};

//likedStatusReducer starts as an empty array 
const likedStatusReducer = (state=[], action) =>{
  switch (action.type) {
    // case'RESET_RECIPE_LIKE_STATUS':
    //   return state;
    case 'SET_RECIPES_LIKES_STATUS':
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
    likedRecipesReducer,
    likedStatusReducer
  });
  