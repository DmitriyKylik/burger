import React, {Component} from 'react';

import Aux from '../../hoc/auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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

  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 0,
      meat: 0,
    },
    ingredientsSequence: ['salad', 'bacon'],
    basePrice: 40,
    totalPrice: null
  };

  //Add handler for setting a base ingredients amount from server data

  addIngredientHandler = (type, input) => {
    let currentAmount = this.state.ingredients[type];

    if(currentAmount !== INGREDIENT_LIMITS[type]) {
      const updatedCount = ++currentAmount;
      const updatedIngredients = {...this.state.ingredients};
      const priceAddition = this.state.totalPrice + INGREDIENT_PRICES[type];
      const updatedSequence = [...this.state.ingredientsSequence];

      updatedSequence.unshift(type);
      updatedIngredients[type] = updatedCount;
      this.setState({
        ingredients: updatedIngredients,
        ingredientsSequence: updatedSequence,
        totalPrice: priceAddition,
      });
      input.current.value = updatedCount;
    }
    // if(currentAmount !== INGREDIENT_LIMITS[type]) {
    //   const updatedCount = ++currentAmount;
    //   const updatedIngredients = {...this.state.ingredients};
    //   const priceAddition = this.state.totalPrice + INGREDIENT_PRICES[type];
    //
    //   updatedIngredients[type] = updatedCount;
    //   this.setState({ingredients: updatedIngredients, totalPrice: priceAddition});
    //   input.current.value = updatedCount;
    // }
  };

  reduceIngredientHandler = (type, input) => {
    let currentAmount = this.state.ingredients[type];

    if(currentAmount > 0) {
      const updatedCount = --currentAmount;
      const updatedIngredients = {...this.state.ingredients};
      const updatedSequence = [...this.state.ingredientsSequence];

      updatedSequence.splice(updatedSequence.findIndex(item => item === type), 1);
      updatedIngredients[type] = updatedCount;
      const priceAddition = this.state.totalPrice + INGREDIENT_PRICES[type];
      this.setState({
        ingredients: updatedIngredients,
        ingredientsSequence: updatedSequence,
        totalPrice: priceAddition,
      });
      input.current.value = updatedCount;
    }

    // if(currentAmount > 0) {
    //   const updatedCount = --currentAmount;
    //   const updatedIngredients = {...this.state.ingredients};
    //
    //   updatedIngredients[type] = updatedCount;
    //   const priceAddition = this.state.totalPrice + INGREDIENT_PRICES[type];
    //   this.setState({ingredients: updatedIngredients, totalPrice: priceAddition});
    //   input.current.value = updatedCount;
    // }
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
      const updatedPrice = this.state.basePrice + (INGREDIENT_PRICES[type] * inputValue);
      updatedIngredients[type] = inputValue;
      this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
    }
  };

  // constructor(props) {
  //   super(props);
  //   this.state= {...}
  // }
  //
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
    // ingredients={this.state.ingredients}
    return (
      <Aux>
        <Burger
          ingredientsSequence={this.state.ingredientsSequence}/>
        <BuildControls
          ingredients={this.state.ingredients}
          addIngredient={this.addIngredientHandler}
          reduceIngredient={this.reduceIngredientHandler}
          changeIngredient={this.changeIngredientHandler}
          disabled={disabledInfo}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
