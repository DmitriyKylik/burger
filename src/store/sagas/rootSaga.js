import { all } from 'redux-saga/effects';
import {
  watchAuth,
  watchburgerBuilder,
  watchOrders,
  } from "./index";

export function* rootSaga() {
  yield all([
    watchAuth(),
    watchburgerBuilder(),
    watchOrders(),
  ])
}
