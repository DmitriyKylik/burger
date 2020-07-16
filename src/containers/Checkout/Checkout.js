import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Auxilliary/auxilliary';
import CheckoutData from './CheckoutData/CheckoutData';
import classes from './Checkout.scss';

const checkout = props => {

  const cancelCheckoutHandler = () => {
    props.history.goBack();
  };

  const continueCheckoutHandler = () => {
    props.history.replace(`${props.match.path}/checkout-data${props.location.search}`)
  };

  let actionButtons = null;
  let burger = <Redirect to="/" />;
  let checkoutData = null;

  if(props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    burger = <Burger ingredientsSequence={props.ingredientsSequence} classes={classes.burger} />;
    actionButtons = (
      <Aux>
        {purchasedRedirect}
        <Button btnType="Danger" classes={classes.controlBtn} clicked={cancelCheckoutHandler}>
          Cancel
        </Button>
        <Button btnType="Success" classes={classes.controlBtn} clicked={continueCheckoutHandler}>
          Continue
        </Button>
      </Aux>
    );
    checkoutData = <Route path={`${props.match.path}/checkout-data`} component={CheckoutData} />;
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
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    ingredientsSequence: state.burgerBuilder.ingredientsSequence,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(checkout);
