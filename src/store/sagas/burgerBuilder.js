import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';

export function* fetchIngredientsSaga() {
  try {
    const response = yield axios.get('ingredients.json/');

    yield put(actions.saveIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsDataFailed());
  }
}

export function* fetchIngredientsParamsSaga() {
  try{
    const response = yield axios.get('ingredientsParams.json/');

    yield put(actions.saveIngredientsParams(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsDataFailed());
  }
}
