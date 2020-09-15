import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import sideDrawerContext from '../../../../context/sideDrawerContext';
import classes from './NavigationItem.scss';


const navigationItem = (props) => {
  const contextType = useContext(sideDrawerContext);

  return (
    <li className={classes.NavigationItem}>
      <NavLink to={props.link}
               exact
               onClick={contextType.close}
               activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
