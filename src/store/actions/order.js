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

export const purchaseBurgerStart = () => {
  return {
    type: actionsType.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('orders.json', orderData)
      .then(response => {
        console.log(response.data)
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

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
      .then(response => {
        // this.setState({loading: false});
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
