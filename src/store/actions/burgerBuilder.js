import * as actionsType from '../actions/actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
  return {
    type: actionsType.ADD_INGREDIENT,
    ingName: name
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionsType.REMOVE_INGREDIENT,
    ingName: name
  };
};

const storeIngredients = (ingredients) => {
  return {
    type: actionsType.STORE_INGREDIENT,
    ingredients,
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionsType.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = (error) => {
  return dispatch => {
    axios.get('ingredients.json/')
      .then(response => {
        dispatch(storeIngredients(response.data))
        // purchasable: Object.values(response.data).some(value => +value > 0),
        // ingredients: response.data,
        // ingredientsSequence: Object.keys(response.data).filter(key => response.data[key] > 0),
      })
      .catch(error => dispatch(fetchIngredientsFailed()));
  };
};

