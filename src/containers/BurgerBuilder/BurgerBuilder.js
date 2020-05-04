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
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    basePrice: 40,
    totalPrice: null
  };

  addIngredientHandler = (type, input) => {
    const updatedCount = ++this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ingredients: updatedIngredients, totalPrice: priceAddition});
    input.current.value = updatedCount;
  };

  reduceIngredientHandler = (type, input) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount > 0) {
      const updatedCount = --this.state.ingredients[type];
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = this.state.totalPrice + INGREDIENT_PRICES[type];
      this.setState({ingredients: updatedIngredients, totalPrice: priceAddition});
      input.current.value = updatedCount;
    }
  };

  changeIngredientHandler = (event, type) => {
    let inputValue = event.target.value;

    if(inputValue === '') {
      inputValue = 0;
    } else {
      inputValue = parseInt(inputValue.replace(/[^\d]/g, ''), 10);
    }

    if(inputValue > INGREDIENT_LIMITS[type]) {
      inputValue = INGREDIENT_LIMITS[type];
    }

    const updatedIngredients = {...this.state.ingredients};
    // add total price for each ingredient
    // console.log(INGREDIENT_PRICES[type] * inputValue);
    // debugger;
    // console.log(this.state.totalPrice);
    const updatedPrice = this.state.basePrice + (INGREDIENT_PRICES[type] * inputValue);
    updatedIngredients[type] = inputValue;
    console.log(updatedPrice);
    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
  };

  // constructor(props) {
  //   super(props);
  //   this.state= {...}
  // }
  //
  render() {
    const disabledInfo = {...this.state.ingredients};
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
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
