import * as actionsType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  ingredientsSequence: [],
  totalPrice: 4,
  error: false,
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
  const updatedPrice = state.totalPrice + INGREDIENT_PRICES[action.ingName];

  return updateObject(state, {ingredients: updatedIngredients, totalPrice: updatedPrice});
};

const removeIngredients = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {[action.ingName]: state.ingredients[action.ingName] - 1});
  const updatedPrice = state.totalPrice + INGREDIENT_PRICES[action.ingName];
  return updateObject(state, {ingredients: updatedIngredients, totalPrice: updatedPrice});
};

const storeIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4,
  });
};

const fetchIngredients = (state, action) => {
  return updateObject(state, {ingredients: null, error: true});
};

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case(actionsType.ADD_INGREDIENT): return addIngredients(state, action);
    case(actionsType.REMOVE_INGREDIENT): return removeIngredients(state, action);
    case(actionsType.STORE_INGREDIENT): return storeIngredients(state, action);
    case(actionsType.FETCH_INGREDIENTS_FAILED): return fetchIngredients(state, action);
    default: return state;
  }
};

export default burgerBuilder;
