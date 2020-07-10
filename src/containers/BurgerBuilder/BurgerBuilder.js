import React, {Component} from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

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

export class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      purchasing: false,
    };
  }

  componentDidMount() {
    if(!this.props.building) {
      this.props.fetchIngredientsParams();
      this.props.fetchIngredients();
    }
  }

  checkPurchasableState (ingredients) {
    const sum = Object.values(ingredients).reduce((sum, value) => sum + value, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if(this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');
  };

  render() {
    let disabledInfo = null;
    if(this.props.ingredients && this.props.params) {
      disabledInfo = {...this.props.ingredients};

      for(let key in disabledInfo) {

        if(disabledInfo[key] <= 0) {
          disabledInfo[key] = {
            less: true,
            more: false,
          };
        } else if(disabledInfo[key] === this.props.params.limits[key]) {
          disabledInfo[key] = {
            less: false,
            more: true,
          };
        }
      }
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients data can't be loaded</p> : <Spinner/>;

    if(this.props.ingredients && this.props.params) {
      burger = (
        <Aux>
          <Burger ingredientsSequence={this.props.ingredientsSequence} classes={classes.burger}/>
          <BuildControls
            isAuth={this.props.isAuthenticated}
            ingredients={this.props.ingredients}
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            changeIngredient={this.props.onChangeIngredient}
            disabled={disabledInfo}
            purchasable={this.checkPurchasableState(this.props.ingredients)}
            ordered={this.purchaseHandler}
            price={this.props.price}/>
        </Aux>);
      orderSummary = <OrderSummary
        hideModal={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredientsPrices={this.props.params.prices}
        ingredients={this.props.ingredients}
        price={this.props.price}/>;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          hide={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
