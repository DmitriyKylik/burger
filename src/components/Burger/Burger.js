import React from 'react';
import classes from './Burger.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

//['salad']

const burger = props => {
  let ingredients = props.ingredientsSequence.map((igKey, index) => {
      return <BurgerIngredient key={igKey + index} type={igKey}/>
  });

  // let ingredients = Object.keys(props.ingredients)
  //   .map(igKey => {
  //     let ingredientsArr = [];
  //     for(let i = 0; i < props.ingredients[igKey]; i++) {
  //       ingredientsArr.push(<BurgerIngredient key={igKey + i} type={igKey}/>)
  //     }
  //     console.log(ingredientsArr);
  //     return ingredientsArr;
  //   })
  //   .reduce((arr, elem) => {
  //     //Concating BurgerIngredient components in one array
  //     return arr.concat(elem);
  //   }, []);

  if(ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {ingredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  )
};

export default burger;
