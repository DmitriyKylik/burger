import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary/auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './BurgerBuilder.scss';
import * as actions from '../../store/actions/index';

export const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    if(!props.building) {
      props.fetchIngredientsParams();
      props.fetchIngredients();
    }
  }, []);

  const checkPurchasableState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, value) => sum + value, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if(props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onPurchaseInit();
    props.history.push('/checkout');
  };

    let disabledInfo = null;
    if(props.ingredients && props.params) {
      disabledInfo = {...props.ingredients};

      for(let key in disabledInfo) {

        if(disabledInfo[key] <= 0) {
          disabledInfo[key] = {
            less: true,
            more: false,
          };
        } else if(disabledInfo[key] === props.params.limits[key]) {
          disabledInfo[key] = {
            less: false,
            more: true,
          };
        }
      }
    }
    let orderSummary = null;
    let buildControls = null;
    let burger = props.error && !props.ingredients && !props.params ? <p>Ingredients data can't be loaded</p> : <Spinner/>;

    if(props.ingredients && props.params) {
      burger = <Burger ingredientsSequence={props.ingredientsSequence} classes={`${classes.burger}`}/>;
      buildControls =
        <BuildControls
          isAuth={props.isAuthenticated}
          ingredients={props.ingredients}
          addIngredient={props.onIngredientAdded}
          removeIngredient={props.onIngredientRemoved}
          changeIngredient={props.onChangeIngredient}
          disabled={disabledInfo}
          purchasable={checkPurchasableState(props.ingredients)}
          ordered={purchaseHandler}
          price={props.price}/>
      orderSummary = <OrderSummary
        hideModal={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        ingredientsPrices={props.params.prices}
        ingredients={props.ingredients}
        price={props.price}/>;
    }

    return (
      <Aux>
        <Modal
          show={purchasing}
          hide={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
        {buildControls}
      </Aux>
    );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    ingredientsSequence: state.burgerBuilder.ingredientsSequence,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchasable: state.burgerBuilder.purchasable,
    building: state.burgerBuilder.building,
    params: state.burgerBuilder.ingredientsParams,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    fetchIngredients: () => dispatch(actions.fetchIngredients()),
    fetchIngredientsParams: () => dispatch(actions.fetchIngredientsParams()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    onChangeIngredient: (name, value) => dispatch(actions.changeIngredient(name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
