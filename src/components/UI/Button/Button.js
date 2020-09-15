import React from 'react';
import classes from './Button.scss';
import propTypes from 'prop-types';

const button = (props) => {
  const attachedClasses = [
    classes.main,
    'btn',
    classes[props.btnType],
    props.classes,
  ].join(' ');
  return (
    <button
      type={props.type ? props.type : "button"}
      disabled={props.disabled ? props.disabled : null}
      className={attachedClasses}
      onClick={props.clicked}>
      {props.children}
    </button>
  );
};

button.propTypes = {
  classes: propTypes.string,
  disabled: propTypes.bool,
};

export default button;
