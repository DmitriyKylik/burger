import React from 'react';
import classes from './Modal.scss';

const modal = (props) => (
  <div className={`${classes.Modal} ${props.show && props.backdropShowed ? classes.active : ''}`}>
    <div className={classes.closeBtn} onClick={() => {props.hide(); props.hideBackdrop(); }}>
      <svg className={classes.icon} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000">
        <g>
          <polygon
            points="990,85.9 914.2,9.9 500,424.2 85.8,9.9 10,85.8 424.2,500 10,914.2 85.8,990.1 500,575.8 914.2,990.1 990,914.1 575.9,500 "/>
        </g>
      </svg>
    </div>
    {props.children}
  </div>
);

export default modal;
