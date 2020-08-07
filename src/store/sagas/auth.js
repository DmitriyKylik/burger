import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action) {
  localStorage.removeItem('burgerAuthToken');
  localStorage.removeItem('burgerAuthExpirationDate');
  localStorage.removeItem('burgerUserId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime);
  //triggers logout actionCreator
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAw1O4qxYbOpBQw9GXCi3T1cm3K--IWVQs';

  if(!action.isSignUp) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAw1O4qxYbOpBQw9GXCi3T1cm3K--IWVQs';
  }

  yield put(actions.authStart());

  try {
    const response = yield axios.post(url, authData);
    const expireTime = parseInt(response.data.expiresIn, 10) * 1000;
    const updatedExpirationTime = new Date(new Date().getTime() + expireTime);

    localStorage.setItem('burgerAuthToken', response.data.idToken);
    localStorage.setItem('burgerAuthExpirationDate', updatedExpirationTime);
    localStorage.setItem('burgerUserId', response.data.localId);

    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(expireTime));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {

  const token = localStorage.getItem('burgerAuthToken');
  if(!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('burgerAuthExpirationDate'));

    if(expirationDate >= new Date()) {
      const userId = localStorage.getItem('burgerUserId');
      const expirationTime = expirationDate.getTime() - new Date().getTime();

      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout(expirationTime));
    }
  }
}
