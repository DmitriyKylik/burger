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
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    ingredientsSequence: [],
    totalPrice: 4,
  };

  //Add handler for setting a base ingredients amount from server data

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
      }, () => {console.log(this.state.totalPrice)});

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
      const priceDeduction = +(this.state.totalPrice - INGREDIENT_PRICES[type]).toFixed(2);

      updatedSequence.splice(updatedSequence.findIndex(item => item === type), 1);
      updatedIngredients[type] = updatedCount;

      this.setState({
        ingredients: updatedIngredients,
        ingredientsSequence: updatedSequence,
        totalPrice: priceDeduction,
      },() => {console.log(this.state.totalPrice)});

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
      },() => {console.log(this.state.totalPrice)});
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

    return (
      <Aux>
        <Burger
          ingredientsSequence={this.state.ingredientsSequence}/>
        <BuildControls
          ingredients={this.state.ingredients}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.reduceIngredientHandler}
          changeIngredient={this.changeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
