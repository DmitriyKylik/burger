import * as actionsType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredientsParams: null,
  ingredients: null,
  ingredientsSequence: [],
  totalPrice: 0,
  error: false,
  building: false,
};

const addIngredients = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {[action.ingName]: state.ingredients[action.ingName] + 1});
  const updatedPrice = +((state.totalPrice + state.ingredientsParams.prices[action.ingName]).toFixed(2));
  const updatedSequence = [...state.ingredientsSequence];

  updatedSequence.unshift(action.ingName);

  return updateObject(state, {
    ingredients: updatedIngredients,
    ingredientsSequence: updatedSequence,
    totalPrice: updatedPrice,
    building: true});
};

const removeIngredients = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {[action.ingName]: state.ingredients[action.ingName] - 1});
  const updatedPrice = +((state.totalPrice - state.ingredientsParams.prices[action.ingName]).toFixed(2));
  const updatedSequence = [...state.ingredientsSequence];

  updatedSequence.splice(updatedSequence.findIndex(item => item === action.ingName), 1);

  return updateObject(state, {
    ingredients: updatedIngredients,
    ingredientsSequence: updatedSequence,
    totalPrice: updatedPrice,
    building: true,
  });
};

const changeIngredient = (state, action) => {
  let inputValue = action.ingValue;

  //convert input value to integer
  if(inputValue === '') {
    inputValue = 0;
  } else {
    const value = inputValue.replace(/[^\d]/g, '');
    inputValue = parseInt(value === '' ? 0 : value, 10);
  }

  if(inputValue > state.ingredientsParams.limits[action.ingName]) {
    inputValue = state.ingredientsParams.limits[action.ingName];
  }

  const updatedIngredients = {...state.ingredients};
  const updatedSequence = [...state.ingredientsSequence];
  let updatedPrice, ingredientsCounter;

  //add ingredients to the beginning of ingredients sequence
  if(updatedIngredients[action.ingName] < inputValue) {
    ingredientsCounter = inputValue - updatedIngredients[action.ingName];

    const ingredientsAmount = new Array(ingredientsCounter).fill(action.ingName);
    updatedPrice = +((state.totalPrice + (state.ingredientsParams.prices[action.ingName] * ingredientsCounter)).toFixed(2));

    updatedSequence.unshift(...ingredientsAmount);
  } else {
    //  remove elements from to the beginning of ingredients sequence
    ingredientsCounter = updatedIngredients[action.ingName] - inputValue;
    updatedPrice = +((state.totalPrice - (state.ingredientsParams.prices[action.ingName] * ingredientsCounter)).toFixed(2));

    //  remove elements by 'type' name
    for(let i = 0; i < ingredientsCounter; i++) {
      const index = updatedSequence.indexOf(action.ingName);
      if(index !== -1) {
        updatedSequence.splice(index, 1);
      }
    }
  }

  updatedIngredients[action.ingName] = inputValue;

  return updateObject(state, {
    ingredients: updatedIngredients,
    ingredientsSequence: updatedSequence,
    totalPrice: updatedPrice,
    building: true
  });
};

const saveIngredients = (state, action) => {
  const ingredientsSequence = Object.keys(action.ingredients).filter(key => action.ingredients[key] > 0 );

  return updateObject(state, {
    ingredients: action.ingredients,
    ingredientsSequence,
    error: false,
    building: false,
  });
};

const fetchIngredientsDataFailed = (state) => {
  return updateObject(state, {ingredients: null, ingredientsSequence: [], error: true});
};

const saveIngredientsParams = (state, action) => {
  return updateObject(state, {
    ingredientsParams: action.ingredientsParams,
    totalPrice: action.ingredientsParams.basePrice,
    error: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case(actionsType.ADD_INGREDIENT): return addIngredients(state, action);
    case(actionsType.REMOVE_INGREDIENT): return removeIngredients(state, action);
    case(actionsType.CHANGE_INGREDIENT): return changeIngredient(state, action);
    case(actionsType.SAVE_INGREDIENTS): return saveIngredients(state, action);
    case(actionsType.SAVE_INGREDIENTS_PARAMS): return saveIngredientsParams(state, action);
    case(actionsType.FETCH_INGREDIENTS_DATA_FAILED): return fetchIngredientsDataFailed(state, action);
    default: return state;
  }
};

export default reducer;
