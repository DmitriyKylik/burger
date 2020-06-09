import React from 'react';
import Aux from '../../../hoc/auxilliary';
import classes from './OrderSummary.scss';

console.log(classes);

const orderSummary = (props) => {
  const ingredientSummary =  Object.entries(props.ingredients)
    .map(([key,value]) => {
      return(
        <li key={`${key}${value}`} className={classes.listItem}>
          <span className={classes.name}>{key}:</span>
          <span className={classes.amount}>x{value}</span>
          <span className={classes.delimiter}>
            -
          </span>
          <span className={classes.cost}>cost:</span>
          <span className={classes.costValue}>
            {`${+(props.ingredientsPrices[key] * value).toFixed(2)}$`}
          </span>
        </li>
      );
    });

  return (
    <Aux>
      <div className={classes.title}>Your order</div>
      <p className={classes.subtitle}>A delicious burger with the following ingredients:</p>
      <ul className={classes.list}>
        {ingredientSummary}
      </ul>
      <p className={classes.continueText}>Continue to Checkout?</p>
      <button>Cancel</button>
      <button>Continue</button>
    </Aux>
  );
};

export default orderSummary;
