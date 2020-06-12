import React from 'react';
import classes from './Logo.scss';
import burgerLogo from '../../assets/img/logo_burger.png';
import propTypes from 'prop-types';

const logo = (props) => {

  return (
    <div className={`${classes.Logo} ${props.classes ? props.classes.join(' ') : null}`}>
      <img src={burgerLogo} alt="BurgerLogo"/>
    </div>
  );
};

logo.propTypes = {
  classes: propTypes.array,
};

export default logo;
