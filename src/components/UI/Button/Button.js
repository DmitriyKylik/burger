import React from 'react';
import classes from './Button.scss';

const button = (props) => (
  <button
    // className={[classes.Main, 'btn', classes[props.btnType]].join(' ')}
    className={`${classes.Main} btn ${classes[props.btnType]} ${props.classes}`}
    onClick={props.clicked}>
    {props.children}
  </button>

);

export default button;
