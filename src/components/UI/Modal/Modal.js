import React from 'react';
import classes from './Modal.scss';

console.log(classes);

const modal = (props) => (
  <div className={`${classes.Modal} ${props.show ? classes.active : ''}`}>
    {/*add close btn*/}
    {props.children}
  </div>
);

export default modal;
