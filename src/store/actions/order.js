import * as actionsType from './actionTypes';

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

export const purchaseBurgerStart = () => {
  return {
    type: actionsType.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionsType.PURCHASE_BURGER_INIT,
    orderData,
    token,
  };
};

export const purchaseInit = () => {
  return {
    type: actionsType.PURCHASE_INIT,
  }
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionsType.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionsType.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionsType.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: actionsType.FETCH_ORDERS_INIT,
    token,
    userId,
  };
};

