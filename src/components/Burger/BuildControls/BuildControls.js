import React from 'react';

import classes from './BuildContorls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map(elem => (
      <BuildControl
        key={elem.label}
        label={elem.label}
        type={elem.type}
        ingredientAmount={props.ingredients[elem.type]}
        added={props.addIngredient}
        decreased={props.reduceIngredient}
        change={props.changeIngredient}
        disabled={props.disabled}/>
    ))}
  </div>
);

export default buildControls;


// added={() => {props.addIngredient(elem.type)}}
// reduce={() => {props.reduceIngredient(elem.type)}}
// change={(event) => {props.changeIngredient(event, elem.type)}}
