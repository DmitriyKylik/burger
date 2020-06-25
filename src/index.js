import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import burgerBuilder from './store/reducers/burgerBuilder';

// const rootReducer = combineReducers({
//   counter: counterReducer,
//   result: resultReducer,
// });

const logger = store => {
  return next => {
    return action => {
      const result = next(action);
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(burgerBuilder, composeEnhancers(applyMiddleware(logger, thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
