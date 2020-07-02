import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';

export function* fetchIngredientsSaga() {
  try {
    const response = yield axios.get('ingredients.json/');

    yield put(actions.saveIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
    // axios.get('ingredients.json/')
    //   .then(response => {
        // dispatch(saveIngredients(response.data))
        // purchasable: Object.values(response.data).some(value => +value > 0),
        // ingredients: response.data,
        // ingredientsSequence: Object.keys(response.data).filter(key => response.data[key] > 0),
      // })
      // .catch(error => dispatch(fetchIngredientsFailed()));
}
