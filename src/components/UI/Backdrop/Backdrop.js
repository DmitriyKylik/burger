import React from 'react';
import classes from './Backdrop.scss';

const backdrop = (props) => {
  let backDrop

  if(props.show) {
    if(document.documentElement.clientWidth > 1025) {
      document.body.classList.add('backdroped');
    }
    backDrop = <div className={classes.backDrop} onClick={props.clicked}></div>
  } else {
    if(document.documentElement.clientWidth > 1025) {
      document.body.classList.remove('backdroped');
    }
    backDrop = null;
  }

  return backDrop;
};

export default backdrop;
