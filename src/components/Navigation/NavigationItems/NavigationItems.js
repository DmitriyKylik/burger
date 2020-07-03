import React from 'react';
import propTypes from 'prop-types';

import classes from './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Auxilliary/auxilliary';

const navigationItems = (props) => {
  return (
    <ul className={`${classes.NavigationItems} ${props.classes}`}>
      <NavigationItem link="/">BurgerBuilder</NavigationItem>
      {props.isAuth
        ? (<Aux>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link="/logout">Logout</NavigationItem>
          </Aux>)
        : <NavigationItem link="/auth">SignUp</NavigationItem>}
    </ul>
  );
};

navigationItems.propTypes = {
  classes: propTypes.string
};

export default navigationItems;
