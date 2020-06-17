import React from 'react';
import classes from './Button.scss';
import propTypes from 'prop-types';

const button = (props) => (
  <button
    // className={[classes.Main, 'btn', classes[props.btnType]].join(' ')}
    className={`${classes.Main} btn ${classes[props.btnType]} ${props.classes}`}
    onClick={props.clicked}>
    {props.children}
  </button>

);

button.propTypes = {
  classes: propTypes.string
};

export default button;
