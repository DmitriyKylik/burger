import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import burgerBuilder from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { rootSaga } from './store/sagas/rootSaga';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilder,
  order: orderReducer,
  auth: authReducer,
});

const logger = store => {
  return next => {
    return action => {
      const result = next(action);
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, sagaMiddleWare)));

sagaMiddleWare.run(rootSaga);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
