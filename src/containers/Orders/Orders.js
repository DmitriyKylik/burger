import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {

  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios.get('/orders.json')
      .then(response => {
        const fetchedOrders = [];

        this.setState({loading: false});

        for(let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        console.log(fetchedOrders);
        this.setState({
          orders: fetchedOrders,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({loading: false});
        console.log(error);
      });
  }


  render() {
    let orders = <Spinner/>
    if(!this.state.loading) {
      orders = this.state.orders.map(order => {
       return(
         <Order key={order.id}
                ingredients={order.ingredients}
                delivered={order.deliveryMethod}
                price={order.price}
                customer={order.customer}/>
       );
      });
    }

    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
