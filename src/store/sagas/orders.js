import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';
import {fetchOrdersStart} from "../actions/index";
import {fetchOrdersFail, fetchOrdersSuccess} from "../actions/order";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(`orders.json?auth=${action.token}`, action.orderData);

    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
  yield put(fetchOrdersStart());
  let url = `/orders.json${queryParams}`;

  if(!action.token) {
    url = `/orders.json`;
  }

  try {
    const response = yield axios.get(url);
    const fetchedOrders = [];

    for(let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key,
      });
    }

    yield put(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(fetchOrdersFail(error))
  }
}
