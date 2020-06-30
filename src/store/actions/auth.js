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
  localStorage.removeItem('burgerAuthToken');
  localStorage.removeItem('burgerAuthExpirationDate');
  localStorage.removeItem('burgerUserId');
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
        const updatedExpirationTime = new Date(new Date().getTime() + +response.data.expiresIn * 1000);

        localStorage.setItem('burgerAuthToken', response.data.idToken);
        localStorage.setItem('burgerAuthExpirationDate', updatedExpirationTime);
        localStorage.setItem('burgerUserId', response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout( updatedExpirationTime ));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
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
