import * as actionsType from '../actions/actionTypes';
import { updateObject } from '../utility';

const inititalState = {
  orders: [],
  loading: false,
  error: null,
  purchased: false,
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const fetchOrdersFail = (state, action) => {
  return updateObject(state, {loading: false});
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {loading: false, orders: action.orders});
};

const purchaseInit = (state, action) => {
  return updateObject(state, {purchased: false});
};

const purchaseBurgerSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat({id: action.orderId, ...action.orderData}),
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, {error: action.error});
};

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, {loading: true});
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case(actionsType.FETCH_ORDERS_START): return fetchOrdersStart(state, action);
    case(actionsType.FETCH_ORDERS_FAIL): return fetchOrdersFail(state, action);
    case(actionsType.FETCH_ORDERS_SUCCESS): return fetchOrdersSuccess(state, action);
    case(actionsType.PURCHASE_INIT): return purchaseInit(state, action);
    case(actionsType.PURCHASE_BURGER_SUCCESS): return purchaseBurgerSuccess(state, action);
    case(actionsType.PURCHASE_BURGER_FAIL): return purchaseBurgerFail(state, action);
    case(actionsType.PURCHASE_BURGER_START): return purchaseBurgerStart(state, action);
    default: return state;
  }
};

export default reducer;
