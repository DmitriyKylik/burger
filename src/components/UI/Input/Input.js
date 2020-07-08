import React from 'react';
import { useField } from 'formik';
import Aux from '../../../hoc/Auxilliary/auxilliary';
import classes from './Input.scss';

const input = (props) => {
  const [field, meta] = useField(props);
  return (
    <div className={classes.inputContainer}>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <input className={`${classes.input} ${meta.error && meta.touched ? classes.invalid : null}`} {...field} {...props}/>
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default input;

{/*<div className={classes.inputContainer}>*/}
  {/*<label htmlFor={props.id || props.name}>{props.label}</label>*/}
  {/*<div className={`${classes.inputWrapper} ${meta.error && meta.touched ? classes.invalid : null}`}>*/}
    {/*<input className={classes.input} {...field} {...props}/>*/}
  {/*</div>*/}
  {/*{meta.touched && meta.error ? (*/}
    {/*<div className={classes.error}>{meta.error}</div>*/}
  {/*) : null}*/}
{/*</div>*/}

/*const input = (props) => {
  let inputElement = null;
  let inputWrapperClasses = [classes.inputWrapper];

  if(!props.isValid && props.shouldValidate && props.touched) {
    inputWrapperClasses.push(classes.invalid);
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
};*/
