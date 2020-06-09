import React from 'react';
import classes from './Backdrop.scss';

const backdrop = (props) => (
  props.show ? <div className={classes.backDrop} onClick={props.clicked}></div> : null
);

export default backdrop;
