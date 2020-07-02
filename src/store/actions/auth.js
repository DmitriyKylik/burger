import * as actionsType from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionsType.AUTH_START
  };
};

export const authFail = (error) => {
  return {
    type: actionsType.AUTH_FAIL,
    error,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionsType.AUTH_SUCCESS,
    idToken,
    userId,
  };
};

export const logout = () => {
  return {
    type: actionsType.AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: actionsType.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionsType.AUTH_CHECK_TIMEOUT,
    expirationTime,
  };
};

export const authLoad = (email, password, isSignUp) => {
  return {
    type: actionsType.AUTH_USER,
    email,
    password,
    isSignUp,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionsType.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('burgerAuthToken');
    if(!token) {
      dispatch(logout());
    } else {
      // burgerAuthExpirationDate
      const expirationDate = new Date(localStorage.getItem('burgerAuthExpirationDate'));

      if(expirationDate >= new Date()) {
        const userId = localStorage.getItem('burgerUserId');
        const expirationTime = expirationDate.getTime() - new Date().getTime();
        console.log(expirationTime / 1000);

        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expirationTime));
      } else {
        // logout
        dispatch(logout());
        //Future optimization logout is not needed
        // return;
      }
    }
  };
};
