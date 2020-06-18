import React from 'react';
import classes from './Input.scss'

console.log(classes);

const input = (props) => {
  let inputElement = null;

  switch (props.inputtype) {
    case('input'):
      inputElement = (
        <div className={classes.inputWrapper}>
          <input type="text" className={classes.input} {...props}/>
        </div>
      );
      break;
    case('textarea'):
      inputElement = (
        <div className={classes.inputWrapper}>
          <textarea className={classes.input} {...props}/>
        </div>
      );
      break;
    default:
      inputElement = (
        <div className={classes.inputWrapper}>
          <input type="text" className={classes.input} {...props}/>
        </div>
      );
  }

  return (
    <div>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
