import React from 'react';
import classes from './Spinner.scss'

const spinner = () => {
  return (
    <div>
      <div className={classes.Loader}>Loading...</div>
    </div>
  );
};

export default spinner;

