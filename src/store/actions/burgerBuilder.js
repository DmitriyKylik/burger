import * as actionsType from '../actions/actionTypes';

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

export const saveIngredients = (ingredients) => {
  return {
    type: actionsType.SAVE_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionsType.FETCH_INGREDIENTS_FAILED
  };
};

export const fetchIngredients = () => {
  return {
    type: actionsType.FETCH_INGREDIENTS,
  };
  // return dispatch => {
  //   axios.get('ingredients.json/')
  //     .then(response => {
  //       dispatch(saveIngredients(response.data))
        // purchasable: Object.values(response.data).some(value => +value > 0),
        // ingredients: response.data,
        // ingredientsSequence: Object.keys(response.data).filter(key => response.data[key] > 0),
      // })
      // .catch(error => dispatch(fetchIngredientsFailed()));
  // };
};

