import * as actionsType from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  ingredientsSequence: [],
  totalPrice: 4,
};

//Get data from backend
// 'ComponentDidMount' method get ingredients prices from the server
// Presumably they should be store in state
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case(actionsType.ADD_INGREDIENT):
      console.log('ADD');
      console.log(state);
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName]
      };
    case(actionsType.REMOVE_INGREDIENT):
      console.log('REMOVE');
      console.log(state);
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingName]: state.ingredients[action.ingName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingName]
      };
    default:
      return state
  }
};

export default reducer;
