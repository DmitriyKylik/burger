import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilliary/auxilliary';
import classes from './SideDrawer.scss';

const sideDrawer = (props) => {

  let attachedClasses = [classes.SideDrawer, classes.Close];

  if(props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.hide}/>
      <div className={attachedClasses.join(' ')}>
        <Logo classes={[classes.Logo]}/>
        <NavigationItems/>
      </div>
    </Aux>
  );
};

export default sideDrawer;
