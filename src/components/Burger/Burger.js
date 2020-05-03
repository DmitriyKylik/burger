import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let ingredients = Object.keys(props.ingredients)
    .map(igKey => {
      let ingredientsArr = [];
      for(let i = 0; i < props.ingredients[igKey]; i++) {
        ingredientsArr.push(<BurgerIngredient key={igKey + i} type={igKey}/>)
      }
      return ingredientsArr;
    })
    .reduce((arr, elem) => {
      return arr.concat(elem);
    }, []);

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
