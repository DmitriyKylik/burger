import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.scss';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if(props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <div className={attachedClasses.join(' ')}>
      <Logo classes={[classes.Logo]}/>
      <NavigationItems/>
    </div>
  );
};

export default sideDrawer;
