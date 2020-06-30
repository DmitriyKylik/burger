import * as actionsType from './actionTypes';
import axios from '../../axios-orders';

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
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post(`orders.json?auth=${token}`, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
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
  return dispatch => {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    dispatch(fetchOrdersStart());
    let url = `/orders.json${queryParams}`;
    if(!token) {
      url = `/orders.json`;
    }

    axios.get(url)
      .then(response => {
        const fetchedOrders = [];

        for(let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }

        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error))
      });
  };
};
