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
        props.reduce(props.type, inputRef)
      }} disabled={props.disabled[props.type]}>Less
      </button>
      <input type="text" ref={inputRef} onChange={(event) => {props.change(event, props.type)}}/>
      <button className={classes.More} onClick={() => {
        props.added(props.type, inputRef)
      }}>More
      </button>
    </div>
  );
};

export default buildControl;
