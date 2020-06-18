import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './CheckoutData.scss';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class CheckoutData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Dmitriy Kylik22222222',
        address: {
          street: 'SomeStreet 1',
          zipCode: '123456',
          country: 'Ukraine',
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'theBest',
    };

    axios.post('orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.replace('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });
  };

  render() {
    let form = (
      <React.Fragment>
        <p>Please add your contact data!</p>
        <form action="">
          <input type="text" name="name" placeholder="Your name"/>
          <input type="email" name="email" placeholder="Your email"/>
          <input type="text" name="stree" placeholder="Your street"/>
          <input type="text" name="postCode" placeholder="Your post code"/>
          <Button btnType="Success" classes={classes.submitButton} clicked={this.orderHandler}>
            Order
          </Button>
        </form>
      </React.Fragment>
    );

    if(this.state.loading) {
      form = <Spinner/>;
    }

    return (
      <div className={classes.CheckoutData}>
        {form}
      </div>
    );
  }
}

export default CheckoutData;
