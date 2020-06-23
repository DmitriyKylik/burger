import React, {Component} from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Auxilliary/auxilliary';
import CheckoutData from './CheckoutData/CheckoutData';
import classes from './Checkout.scss';

class Checkout extends Component {

  // state = {
  //   ingredientsSequence: [],
  //   ingredients: {},
  //   price: 0,
  // };

  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //
  //   for(let [key, value] of query.entries()) {
  //     if(key === 'price') {
  //       price = value;
  //     } else {
  //       ingredients[key] = value;
  //     }
  //   }
  //   this.setState({
  //     ingredients: {...ingredients},
  //     ingredientsSequence: this.props.history.location.state ? [...this.props.history.location.state.ingredientsSequence] : [],
  //     price: price
  //   });
  //
  // }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace(`${this.props.match.url}/checkout-data${this.props.location.search}`)
  };



  render() {
    let actionButtons = null;
    let burger = null;
    let contactData = null;
    // if(this.state.ingredientsSequence.length === 0) {
    if(!this.props.ingredients) {
      burger = <p>Your burger is empty!<NavLink to="/" className={`${classes.homeLink} slide-line`}>Add some ingredients</NavLink></p>;
    } else {
      // burger = <Burger ingredientsSequence={this.props.ingredients} />;
      burger = <Burger ingredients={this.props.ingredients} />;
      actionButtons = (
        <Aux>
          <Button btnType="Danger" classes={classes.controlBtn} clicked={this.cancelCheckoutHandler}>
            Cancel
          </Button>
          <Button btnType="Success" classes={classes.controlBtn} clicked={this.continueCheckoutHandler}>
            Continue
          </Button>
        </Aux>
      );
      contactData = <Route path={`${this.props.match.path}/checkout-data`} component={CheckoutData} />;
    }

    return (
      <div className={classes.Checkout}>
        <h1>Burger Checkout</h1>
        {burger}
        <div className={classes.btnWrapper} classes={classes.controlBtn}>
          {actionButtons}
        </div>
        {contactData}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);
