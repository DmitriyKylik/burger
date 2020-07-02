import { takeEvery } from 'redux-saga/effects';

import * as actionsType from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actionsType.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionsType.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionsType.AUTH_USER, authUserSaga);
}
