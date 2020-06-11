import React from 'react';
import classes from './Toolbar.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = (props) => {
  return (
    <header className={`${classes.Toolbar} flex flex-v-center flex-between`}>
      <div className={classes.Menu} onClick={props.sideDrawerOpen}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Logo classes={[classes.Logo]}/>
      <nav className={`${classes.Nav} ${classes.DesktopOnly}`}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
