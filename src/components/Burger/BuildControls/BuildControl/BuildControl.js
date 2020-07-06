import React, {useRef} from 'react';
import classes from './BuildControl.scss';
import Button from '../../../UI/Button/Button';

const buildControl = (props) => {
  const inputRef = useRef();

  return (
    <div className={classes.buildControl}>
      <div className={`${classes.label} t-700`}>{props.label}</div>
      <Button
        classes={`${classes.buildBtn} ${classes.less}`}
        clicked={() => props.removed(props.type)}
        disabled={props.disabled[props.type].less}>
        Less
      </Button>
      {/*<button*/}
        {/*className={classes.Less}*/}
        {/*onClick={() => {props.removed(props.type, inputRef)}}*/}
        {/*onClick={() => {props.removed(props.type)}}*/}
        {/*disabled={props.disabled[props.type].less}>*/}
        {/*Less*/}
      {/*</button>*/}
      {/*<input type="text" value={props.ingredientAmount} ref={inputRef} onChange={(event) => {props.changed(event, props.type)}}/>*/}
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
      {/*<button*/}
        {/*className={classes.More}*/}
        {/*onClick={() => {props.added(props.type, inputRef)}}*/}
        {/*onClick={() => {props.added(props.type)}}*/}
        {/*disabled={props.disabled[props.type].more}>*/}
        {/*More*/}
      {/*</button>*/}
    </div>
  );
};

export default buildControl;
