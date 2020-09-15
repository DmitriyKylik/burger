import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Logo.scss';
import burgerLogo from '../../assets/img/logo_burger.png';
import propTypes from 'prop-types';

const logo = (props) => {

  return (
    <NavLink to="/" className={`${classes.logo} ${props.classes}`}>
      <img src={burgerLogo} alt="BurgerLogo"/>
    </NavLink>
  );
};

logo.propTypes = {
  classes: propTypes.string,
};

export default logo;
