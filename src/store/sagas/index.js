import { takeEvery, all } from 'redux-saga/effects';

import * as actionsType from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { fetchIngredientsSaga, fetchIngredientsParamsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './orders';

export function* watchAuth() {
  yield all([
    takeEvery(actionsType.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionsType.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionsType.AUTH_USER, authUserSaga),
    takeEvery(actionsType.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchburgerBuilder() {

  yield all([
    takeEvery(actionsType.FETCH_INGREDIENTS, fetchIngredientsSaga),
    takeEvery(actionsType.FETCH_INGREDIENTS_PARAMS, fetchIngredientsParamsSaga),
  ]);
}

export function* watchOrders() {
  yield all([
    takeEvery(actionsType.PURCHASE_BURGER_INIT, purchaseBurgerSaga),
    takeEvery(actionsType.FETCH_ORDERS_INIT, fetchOrdersSaga),
  ]);
}



