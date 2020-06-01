import React, {useEffect, useRef} from 'react';
import classes from './BuildControl.css'

const buildControl = (props) => {
  const inputRef = useRef();
  // useEffect(() => {
  //
  // });

  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less} onClick={() => {
        props.decreased(props.type, inputRef) }}
        disabled={props.disabled[props.type].less}>
        Less
      </button>
      <input type="text" value={props.ingredientAmount} ref={inputRef} onChange={(event) => {props.change(event, props.type)}}/>
      <button className={classes.More} onClick={() => {
        props.added(props.type, inputRef)}}
        disabled={props.disabled[props.type].more}>
        More
      </button>
    </div>
  );
};

export default buildControl;
