import React from 'react';
import classes from './NavigationItems.scss';
import Navigationitem from './NavigationItem/NavigationItem';

// {Navigationitem.map((elem, index) => {
//   <Navigationitem/>
// })}

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <Navigationitem link="/" active>Home</Navigationitem>
      <Navigationitem link="/">Catalog</Navigationitem>
      <Navigationitem link="/">Orders</Navigationitem>
    </ul>
  );
};

export default navigationItems;
