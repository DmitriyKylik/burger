import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as ordersActions from '../../store/actions/index';
import classes from './Orders.scss';

const orders = props => {

  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);
  
  let orders = <Spinner/>;
  if(!props.loading) {
    if(Array.isArray(props.orders) && props.orders.length > 0) {
      orders = props.orders.map(order => {
        return (
          <Order key={order.id}
                 ingredients={order.ingredients}
                 delivered={order.orderData.deliveryMethod}
                 price={order.price}
                 country={order.orderData.country}
                 customer={order.orderData.name}/>
        );
      });
    } else {
      orders = <p className={classes.ordersEmpty}>You haven't made an orders yet.</p>
    }
  }

  return (
    <div className={classes.ordersWrapper}>
      {orders}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(ordersActions.fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
