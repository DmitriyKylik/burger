import React from 'react';

import classes from './Toolbar.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = (props) => {
  return (
    <header className={`${classes.toolbar} flex flex-v-center flex-between`}>
      <div className={`${classes.menu} ${classes.mobileOnly}`} onClick={props.sideDrawerOpen}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Logo classes={classes.logo} />
      <nav className={`${classes.nav} ${classes.desktopOnly}`}>
        <NavigationItems isAuth={props.isAuth} classes={classes.navList} />
      </nav>
    </header>
  );
};

export default toolbar;
