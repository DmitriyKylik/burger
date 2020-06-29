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
    type: actionsType.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const authLoad = (email, password, isSignUp) => {
  return dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAw1O4qxYbOpBQw9GXCi3T1cm3K--IWVQs';

    if(!isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAw1O4qxYbOpBQw9GXCi3T1cm3K--IWVQs';
    }

    dispatch(authStart());
    axios.post(url, authData)
      .then(response => {
        const updatedExpirationTime = +(+response.data.expiresIn * 1000).toFixed(2);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout( updatedExpirationTime ));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
