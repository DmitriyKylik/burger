import React from 'react';
import classes from './BuildControls.scss';
import BuildControl from './BuildControl/BuildControl';
import Button from '../../UI/Button/Button';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
];

const buildControls = (props) => {
  return (
    <div className={classes.buildControls}>
      <p>Current price: {props.price}</p>
      {controls.map(ctrl => (
        //Add prices for each ingredient
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          type={ctrl.type}
          ingredientAmount={props.ingredients[ctrl.type]}
          added={props.addIngredient}
          removed={props.removeIngredient}
          changed={props.changeIngredient}
          disabled={props.disabled}/>
      ))}
      <Button classes={`btn ${classes.orderButton}`}
              clicked={props.ordered}
              disabled={!props.purchasable}>
        {props.isAuth ? 'Order now' : 'Sign Up for Order'}
      </Button>
    </div>
  );

};

export default buildControls;
