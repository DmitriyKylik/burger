import React from 'react';
import classes from './Input.scss'

const input = (props) => {
  let inputElement = null;
  let inputWrapperClasses = [classes.inputWrapper];

  if(!props.isValid && props.shouldValidate && props.touched) {
    inputWrapperClasses.push(classes.Invalid);
  }



  switch (props.elementType) {
    case('input'):
      inputElement = (
        <div className={inputWrapperClasses.join(' ')}>
          <input type="text" className={classes.input} {...props.elementConfig} value={props.value} onChange={props.changed}/>
        </div>
      );
      break;
    case('textarea'):
      inputElement = (
        <div className={inputWrapperClasses.join(' ')}>
          <textarea className={classes.input} {...props.elementConfig} value={props.value} onChange={props.changed}/>
        </div>
      );
      break;
    case('select'):
      inputElement = (
        <div className={inputWrapperClasses.join(' ')}>
          <select className={classes.input} value={props.value} onChange={props.changed}>
            {props.elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.outputValue}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    default:
      inputElement = (
        <div className={classes.inputWrapper}>
          <input type="text" className={classes.input} {...props.elementConfig} value={props.value} onChange={props.changed}/>
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
