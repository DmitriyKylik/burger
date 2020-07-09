import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as ordersActions from '../../store/actions/index';
import classes from './Orders.scss';

class Orders extends Component {

  state = {
    // orders: [],
    // loading: true
  };

  componentWillMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
    // axios.get('/orders.json')
    //   .then(response => {
    //     const fetchedOrders = [];
    //
    //     this.setState({loading: false});
    //
    //     for(let key in response.data) {
    //       fetchedOrders.push({
    //         ...response.data[key],
    //         id: key,
    //       });
    //     }
    //     console.log(fetchedOrders);
    //     this.setState({
    //       orders: fetchedOrders,
    //       loading: false,
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({loading: false});
    //     console.log(error);
    //   });
  }


  render() {
    let orders = <Spinner/>
    if(!this.props.loading) {
      orders = this.props.orders.map(order => {
        debugger;
       return(
         <Order key={order.id}
                ingredients={order.ingredients}
                delivered={order.orderData.deliveryMethod}
                price={order.price}
                country={order.orderData.country}
                customer={order.orderData.name}/>
       );
      });
    }

    return (
      <div className={classes.ordersWrapper}>
        {orders}
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
