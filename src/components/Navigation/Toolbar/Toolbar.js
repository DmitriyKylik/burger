import React from 'react';
import classes from './Toolbar.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

console.log(classes);

const toolbar = () => {
  return (
    <header className={`${classes.Toolbar} flex flex-v-center flex-between`}>
      <div>MENU</div>
      <Logo classes={[classes.Logo]}/>
      <nav className={`${classes.Nav} ${classes.DesktopOnly}`}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
