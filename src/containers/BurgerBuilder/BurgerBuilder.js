import React, {Component} from 'react';
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

const INGREDIENT_PRICES = {
  salad: 0.3,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.5
};

const INGREDIENT_LIMITS = {
  salad: 10,
  meat: 8,
  cheese: 15,
  bacon: 40
};

export class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    purchasing: false,
    loading: false,
  };

  componentWillUnmount() {
    console.log('Burger Builder UnMount');
  }

  //Add handler for setting a base ingredients amount from server data
  componentWillMount() {
  // componentDidMount() {
    this.props.fetchIngredients();
    // console.log(this.props.fetchIngredients());
  //   axios.get('ingredients.json/')
  //     .then(response => {
  //       this.setState({
  //         purchasable: Object.values(response.data).some(value => +value > 0),
  //         ingredients: response.data,
  //         ingredientsSequence: Object.keys(response.data).filter(key => response.data[key] > 0),
  //       });
  //       console.log(this.props.history);
  //     })
  //     .catch(error => this.setState({error: true}));
  }

  //Set purchase button state
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
    if(this.props.ingredients) {
      disabledInfo = {...this.props.ingredients};

      //Correct statement
      for(let key in disabledInfo) {

        if(disabledInfo[key] <= 0) {
          disabledInfo[key] = {
            less: true,
            more: false,
          };
        } else if(disabledInfo[key] === INGREDIENT_LIMITS[key]) {
          disabledInfo[key] = {
            less: false,
            more: true,
          };
        }
      }
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

    // if(this.state.ingredients) {
    if(this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredientsSequence={this.props.ingredientsSequence} classes={classes.burger}/>
          {/*<Burger ingredients={this.props.ingredients} classes={classes.burger}/>*/}
          <BuildControls
            isAuth={this.props.isAuthenticated}
            ingredients={this.props.ingredients}
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            // changeIngredient={this.changeIngredientHandler}
            changeIngredient={this.props.onChangeIngredient}
            disabled={disabledInfo}
            // purchasing={this.checkPurchasingState(this.props.ingredients)}
            purchasable={this.checkPurchasableState(this.props.ingredients)}
            // purchasable={this.props.purchasable}
            ordered={this.purchaseHandler}
            price={this.props.price}/>
        </Aux>);
      orderSummary = <OrderSummary
        hideModal={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        ingredientsPrices={INGREDIENT_PRICES}
        // ingredients={this.state.ingredients}
        ingredients={this.props.ingredients}
        price={this.state.price}/>;
    }

    // if(this.state.loading) {
    //   orderSummary = <Spinner/>
    // }

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
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    fetchIngredients: () => dispatch(actions.fetchIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    onChangeIngredient: (name, value) => dispatch(actions.changeIngredient(name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
