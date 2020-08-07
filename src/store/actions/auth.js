import * as actionsType from './actionTypes';


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
  debugger;
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
  return {
    type: actionsType.AUTH_CHECK_STATE,
  };
};
