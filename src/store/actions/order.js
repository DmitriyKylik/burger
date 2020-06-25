import * as actionsType from './actionTypes';
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionsType.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFail = (errorMess) => {
  return {
    type: actionsType.PURCHASE_BURGER_FAIL,
    error: errorMess,
  };
};

export const puchaseBurgerLoad = (orderData) => {
  return dispatch => {
    axios.post('orders.json', order)
      .then(response => {
        console.log(response.data)
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};
