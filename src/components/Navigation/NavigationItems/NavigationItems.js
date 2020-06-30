import React from 'react';
import classes from './NavigationItems.scss';
import Navigationitem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Auxilliary/auxilliary';

// {Navigationitem.map((elem, index) => {
//   <Navigationitem/>
// })}

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <Navigationitem link="/">BurgerBuilder</Navigationitem>
      {props.isAuth
        ? (<Aux>
            <Navigationitem link="/orders">Orders</Navigationitem>
            <Navigationitem link="/logout">Logout</Navigationitem>
          </Aux>)
        : <Navigationitem link="/auth">SignUp</Navigationitem>}
    </ul>
  );
};

export default navigationItems;
