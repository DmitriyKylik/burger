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

export const changeIngredient = (name, value) => {
  return {
    type: actionsType.CHANGE_INGREDIENT,
    ingName: name,
    ingValue: value,
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
};

