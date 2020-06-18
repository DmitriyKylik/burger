import React from 'react';
import classes from './Order.scss';

const order = (props) => {
  // let ingredients = Object.keys(props.ingredients)
  //   .map(igKey => {
  //     let ingredientsArr = [];
  //     for(let i = 0; i < props.ingredients[igKey]; i++) {
  //       ingredientsArr.push(
  //         <div key={igKey + i} className={classes.dataItem}>
  //           <span className={classes.dataName}>{igKey}</span>
  //           <span className={classes.dataValue}>{props.ingredients[igKey]}</span>
  //         </div>);
  //     }
  //     return ingredientsArr;
  //   })
  //   .reduce((arr, elem) => {
  //     //Concating BurgerIngredient components in one array
  //     return arr.concat(elem);
  //   }, []);

  console.log(props);
  let ingredients = [];
  for(let [key, value] of Object.entries(props.ingredients)) {
    // console.log();
    ingredients.push((
      <div key={key + value} className={`${classes.ingredientsItem} flex flex-wrap`}>
        <span className={classes.ingredientsName}>{key}:</span>
        <span className={classes.ingredientsValue}>{value}</span>
      </div>
    ));
  }

  // let customer = Object.entries().map((customer, index)=> {
  //   return (
  //     <div key={customer.name + index} className={classes.dataItem}>
  //       <span className={classes.dataName}>{customer.name}</span>
  //       <span className={classes.dataValue}>{props.ingredients[igKey]}</span>
  //     </div>);
  //   );
  // });

  return (
    <div className={classes.Order}>
      <div className={`flex flex-h-start`}>
        <div className={classes.ingredientsTitle}>Ingredients:</div>
        <div className={`${classes.ingredientsInner} flex flex-wrap`}>
          {ingredients}
        </div>
      </div>
      <p>Price: <span className={classes.priceValue}>USD {props.price}</span></p>
      <p>Delivery method: {props.delivered}</p>
      {/*<div>*/}
        {/*<div className={classes.dataTitle}>Customer</div>*/}
        {/*<div>{customer}</div>*/}
      {/*</div>*/}
    </div>
  );
};

export default order;
