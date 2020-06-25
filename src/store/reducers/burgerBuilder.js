import * as actionsType from '../actions/actionTypes';

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

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case(actionsType.ADD_INGREDIENT):
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName]
      };
    case(actionsType.REMOVE_INGREDIENT):
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingName]
      };
    case(actionsType.STORE_INGREDIENT):
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
      }
    case(actionsType.FETCH_INGREDIENTS_FAILED):
      return {
        ...state,
        ingredients: null,
        error: true
      };
    default:
      return state
  }
};

export default burgerBuilder;
