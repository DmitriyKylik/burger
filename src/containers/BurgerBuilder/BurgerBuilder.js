import React, {Component} from 'react';

import Aux from '../../hoc/Auxilliary/auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

//Get data from backend
// 'ComponentDidMount' method get ingredients prices from the server
// Presumably they should be store in state
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

class BurgerBuilder extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    ingredientsSequence: [],
    totalPrice: 4,
    purchasing: false,
    purchasable: false,
    loading: false,
  };

  //Add handler for setting a base ingredients amount from server data

  updatePurchase (ingredients) {
    const sum = Object.values(ingredients).reduce((sum, value) => sum + value, 0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type, input) => {
    let currentAmount = this.state.ingredients[type];

    if(currentAmount !== INGREDIENT_LIMITS[type]) {
      const updatedCount = ++currentAmount;
      const updatedIngredients = {...this.state.ingredients};
      const priceAddition = +(this.state.totalPrice + INGREDIENT_PRICES[type]).toFixed(2);
      const updatedSequence = [...this.state.ingredientsSequence];

      updatedSequence.unshift(type);
      updatedIngredients[type] = updatedCount;

      this.setState({
        ingredients: updatedIngredients,
        ingredientsSequence: updatedSequence,
        totalPrice: priceAddition,
      });

      input.current.value = updatedCount;
      this.updatePurchase(updatedIngredients);
    }
  };

  reduceIngredientHandler = (type, input) => {
    let currentAmount = this.state.ingredients[type];

    if(currentAmount > 0) {
      const updatedCount = --currentAmount;
      const updatedIngredients = {...this.state.ingredients};
      const updatedSequence = [...this.state.ingredientsSequence];
      const priceDeduction = +(this.state.totalPrice - INGREDIENT_PRICES[type]).toFixed(2);

      updatedSequence.splice(updatedSequence.findIndex(item => item === type), 1);
      updatedIngredients[type] = updatedCount;

      this.setState({
        ingredients: updatedIngredients,
        ingredientsSequence: updatedSequence,
        totalPrice: priceDeduction,
      });

      input.current.value = updatedCount;
      this.updatePurchase(updatedIngredients);
    }
  };

  changeIngredientHandler = (event, type) => {
    let inputValue = event.target.value;

    //convert input value to integer
    if(inputValue === '') {
      inputValue = 0;
    } else {
      inputValue = parseInt(inputValue.replace(/[^\d]/g, ''), 10);
    }

    if(inputValue > INGREDIENT_LIMITS[type]) {
      inputValue = INGREDIENT_LIMITS[type];
    }

    //prevent rerender components if input value is the same as current ingredient amount
    if(inputValue !== this.state.ingredients[type]) {
      const updatedIngredients = {...this.state.ingredients};
      const updatedSequence = [...this.state.ingredientsSequence];
      let updatedPrice, ingredientsCounter;

      //add ingredients to the beginning of ingredients sequence
      if(updatedIngredients[type] < inputValue) {
        ingredientsCounter = inputValue - updatedIngredients[type];
        const ingredientsAmount = new Array(ingredientsCounter).fill(type);
        updatedPrice = +(this.state.totalPrice + (INGREDIENT_PRICES[type] * ingredientsCounter)).toFixed(2);

        updatedSequence.unshift(...ingredientsAmount);
      } else {
      //  remove elements from to the beginning of ingredients sequence
        ingredientsCounter = updatedIngredients[type] - inputValue;
        updatedPrice = +(this.state.totalPrice - (INGREDIENT_PRICES[type] * ingredientsCounter)).toFixed(2);

      //  remove elements by 'type' name
        for(let i = 0; i < ingredientsCounter; i++) {
          const index = updatedSequence.indexOf(type);
          if(index !== -1) {
            updatedSequence.splice(index, 1);
          }
        }
      }

      updatedIngredients[type] = inputValue;
      this.setState({
        ingredients: updatedIngredients,
        ingredientsSequence: updatedSequence,
        totalPrice: updatedPrice,
      });

      this.updatePurchase(updatedIngredients);
    }
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Dmitriy Kylik22222222',
        address: {
          street: 'SomeStreet 1',
          zipCode: '123456',
          country: 'Ukraine',
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'theBest'
    };

    axios.post('orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
        console.log(response);
      })
      .catch(error => {
        this.setState({loading: false, purchasing: false});
        console.log(error);
      });
  };


  render() {
    const disabledInfo = {...this.state.ingredients};

    //Correct statement
    for(let key in disabledInfo) {

      if(disabledInfo[key] <= 0) {
        disabledInfo[key] = {
          less: true,
          more: false,
        };
      }else if(disabledInfo[key] === INGREDIENT_LIMITS[key]) {
        disabledInfo[key] = {
          less: false,
          more: true,
        };
      }
    }

    let orderSummary = <OrderSummary
        hideModal={this.purchaseCancelHandler}
        // hideBackdrop={context.toggleShow}
        purchaseContinued={this.purchaseContinueHandler}
        ingredientsPrices={INGREDIENT_PRICES}
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}/>

    if(this.state.loading) {
      orderSummary = <Spinner/>
    }

    return (
      <Aux>
        <Burger ingredientsSequence={this.state.ingredientsSequence}/>
        <Modal
          show={this.state.purchasing}
          hide={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <BuildControls
          ingredients={this.state.ingredients}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.reduceIngredientHandler}
          changeIngredient={this.changeIngredientHandler}
          disabled={disabledInfo}
          purchasing={this.state.purchasable}
          ordered={this.purchaseHandler}
          // backdropToggle={context.toggleShow}
          price={this.state.totalPrice}/>
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
