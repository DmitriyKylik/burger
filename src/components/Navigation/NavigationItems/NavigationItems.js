import React from 'react';
import classes from './NavigationItems.scss';
import Navigationitem from './NavigationItem/NavigationItem';

// {Navigationitem.map((elem, index) => {
//   <Navigationitem/>
// })}

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <Navigationitem link="/">BurgerBuilder</Navigationitem>
      <Navigationitem link="/orders">Orders</Navigationitem>
      {props.isAuth
        ? <Navigationitem link="/logout">Logout</Navigationitem>
        : <Navigationitem link="/auth">SignUp</Navigationitem>}
    </ul>
  );
};

export default navigationItems;
