import React, {useRef} from 'react';
import classes from './BuildControl.scss';

const buildControl = (props) => {
  const inputRef = useRef();

  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={() => {props.removed(props.type, inputRef)}}
        disabled={props.disabled[props.type].less}>
        Less
      </button>
      <input type="text" value={props.ingredientAmount} ref={inputRef} onChange={(event) => {props.changed(event, props.type)}}/>
      <button
        className={classes.More}
        onClick={() => {props.added(props.type, inputRef)}}
        disabled={props.disabled[props.type].more}>
        More
      </button>
    </div>
  );
};

export default buildControl;
