import React from 'react';
import classes from './Button.scss';
import propTypes from 'prop-types';

const button = (props) => {
  const attachedClasses = [
    classes.Main,
    'btn',
    classes[props.btnType],
    props.classes,
  ].join(' ');

  return (
    <button
      disabled={props.disabled}
      className={attachedClasses}
      onClick={props.clicked}>
      {props.children}
    </button>
  );
};

button.propTypes = {
  classes: propTypes.string
};

export default button;
