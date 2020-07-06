import * as actionsType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  ingredientsSequence: [],
  totalPrice: 4,
  error: false,
  building: false,
};

//Get data from backend
// 'ComponentDidMount' method get ingredients prices from the server
const INGREDIENT_PRICES = {
  salad: 0.3,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.5
};

const INGREDIENT_LIMITS = {
  salad: 10,
  meat: 8,
  cheese: 15,
  bacon: 40
};

const addIngredients = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {[action.ingName]: state.ingredients[action.ingName] + 1});
  const updatedPrice = +((state.totalPrice + INGREDIENT_PRICES[action.ingName]).toFixed(2));
  const updatedSequence = [...state.ingredientsSequence];

  updatedSequence.unshift(action.ingName);

  return updateObject(state, {ingredients: updatedIngredients, ingredientsSequence: updatedSequence, totalPrice: updatedPrice, building: true});
};

const removeIngredients = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {[action.ingName]: state.ingredients[action.ingName] - 1});
  const updatedPrice = +((state.totalPrice - INGREDIENT_PRICES[action.ingName]).toFixed(2));
  const updatedSequence = [...state.ingredientsSequence];

  updatedSequence.splice(updatedSequence.findIndex(item => item === action.ingName), 1);

  return updateObject(state, {ingredients: updatedIngredients, ingredientsSequence: updatedSequence, totalPrice: updatedPrice, building: true});
};

const changeIngredient = (state, action) => {
  let inputValue = action.ingValue;

  //convert input value to integer
  if(inputValue === '') {
    inputValue = 0;
  } else {
    inputValue = parseInt(inputValue.replace(/[^\d]/g, ''), 10);
  }

  if(inputValue > INGREDIENT_LIMITS[action.ingName]) {
    inputValue = INGREDIENT_LIMITS[action.ingName];
  }

  const updatedIngredients = {...state.ingredients};
  const updatedSequence = [...state.ingredientsSequence];
  let updatedPrice, ingredientsCounter;

  //add ingredients to the beginning of ingredients sequence
  if(updatedIngredients[action.ingName] < inputValue) {
    ingredientsCounter = inputValue - updatedIngredients[action.ingName];

    const ingredientsAmount = new Array(ingredientsCounter).fill(action.ingName);
    updatedPrice = +((state.totalPrice + (INGREDIENT_PRICES[action.ingName] * ingredientsCounter)).toFixed(2));

    updatedSequence.unshift(...ingredientsAmount);
  } else {
    //  remove elements from to the beginning of ingredients sequence
    ingredientsCounter = updatedIngredients[action.ingName] - inputValue;
    updatedPrice = +((state.totalPrice - (INGREDIENT_PRICES[action.ingName] * ingredientsCounter)).toFixed(2));

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
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4,
    building: false,
  });
};

const fetchIngredientsFailed = (state) => {
  return updateObject(state, {ingredients: null, error: true});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case(actionsType.ADD_INGREDIENT): return addIngredients(state, action);
    case(actionsType.REMOVE_INGREDIENT): return removeIngredients(state, action);
    case(actionsType.CHANGE_INGREDIENT): return changeIngredient(state, action);
    case(actionsType.SAVE_INGREDIENTS): return saveIngredients(state, action);
    case(actionsType.FETCH_INGREDIENTS_FAILED): return fetchIngredientsFailed(state, action);
    default: return state;
  }
};

export default reducer;
