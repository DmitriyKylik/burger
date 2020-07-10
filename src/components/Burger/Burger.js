import React from 'react';
import classes from './Burger.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let ingredients = props.ingredientsSequence.map((igKey, index) => {
      return <BurgerIngredient key={igKey + index} type={igKey}/>
  });

  if(ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={`${classes.Burger} ${props.classes}`}>
      <BurgerIngredient type="bread-top"/>
      {ingredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  )
};

export default burger;
