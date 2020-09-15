import React from 'react';
import classes from './Order.scss';

const order = (props) => {
  let ingredients = [];

  for(let [key, value] of Object.entries(props.ingredients)) {
    ingredients.push((
      <div key={key + value} className={`${classes.ingredientsItem} flex flex-wrap`}>
        <span className={classes.ingredientsName}>{key}:</span>
        <span className={classes.ingredientsValue}>{value}</span>
      </div>
    ));
  }

  return (
    <div className={classes.order}>
      <div className={`flex flex-h-start`}>
        <div className={classes.ingredientsTitle}>Ingredients:</div>
        <div className={`${classes.ingredientsInner} flex flex-wrap`}>
          {ingredients}
        </div>
      </div>
      <p className={classes.contactData}>Price: <span className={classes.orderDataValue}>USD {props.price}</span></p>
      <p className={classes.contactData}>Delivery method: <span className={classes.orderDataValue}>{props.delivered}</span></p>
      <p className={classes.contactData}>Country: <span className={classes.orderDataValue}>{props.country}</span></p>
      <p className={classes.contactData}> Customer: <span className={classes.orderDataValue}>{props.customer}</span></p>
    </div>
  );
};

export default order;
