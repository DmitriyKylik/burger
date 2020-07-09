import React, {Component} from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Auxilliary/auxilliary';
import CheckoutData from './CheckoutData/CheckoutData';
import classes from './Checkout.scss';
import * as actionsType from "../../store/actions";

class Checkout extends Component {

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace(`${this.props.match.path}/checkout-data${this.props.location.search}`)
  };

  render() {
    let actionButtons = null;
    let burger = <Redirect to="/" />;
    let checkoutData = null;

    if(this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

      burger = <Burger ingredientsSequence={this.props.ingredientsSequence} />;
      actionButtons = (
        <Aux>
          {purchasedRedirect}
          <Button btnType="Danger" classes={classes.controlBtn} clicked={this.cancelCheckoutHandler}>
            Cancel
          </Button>
          <Button btnType="Success" classes={classes.controlBtn} clicked={this.continueCheckoutHandler}>
            Continue
          </Button>
        </Aux>
      );
      checkoutData = <Route path={`${this.props.match.path}/checkout-data`} component={CheckoutData} />;
    } else {
      burger = <p>Your burger is empty!<NavLink to="/" className={`${classes.homeLink} slide-line`}>Add some ingredients</NavLink></p>;
    }

    return (
      <div className={classes.checkout}>
        <h1>Burger Checkout</h1>
        {burger}
        <div className={classes.btnWrapper}>
          {actionButtons}
        </div>
        {checkoutData}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    ingredientsSequence: state.burgerBuilder.ingredientsSequence,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
