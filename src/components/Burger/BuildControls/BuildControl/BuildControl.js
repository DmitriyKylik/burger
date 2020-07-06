import React from 'react';
import classes from './BuildControl.scss';
import Button from '../../../UI/Button/Button';

const buildControl = (props) => {

  return (
    <div className={classes.buildControl}>
      <div className={`${classes.label} t-700`}>{props.label}</div>
      <Button
        classes={`${classes.buildBtn} ${classes.less}`}
        clicked={() => props.removed(props.type)}
        disabled={props.disabled[props.type].less}>
        Less
      </Button>
      <input
        type="text"
        value={props.ingredientAmount}
        className={classes.buildInput}
        onChange={(event) => {props.changed(props.type, event.target.value)}} />
      <Button
        classes={`${classes.buildBtn} ${classes.more}`}
        clicked={() => props.added(props.type)}
        disabled={props.disabled[props.type].more}>
        More
      </Button>
    </div>
  );
};

export default buildControl;
