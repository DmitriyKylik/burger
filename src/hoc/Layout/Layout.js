import React, { useState, } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary/auxilliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import SideDrawerContext from '../../context/sideDrawerContext';
import classes from './Layout.scss';

const Layout = (props) => {
  const [sideDrawerState, setSideDrawerState] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerState(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerState(!sideDrawerState);
  };

  return (
    <Aux>
      <Toolbar isAuth={props.isAuthenticated} sideDrawerOpen={sideDrawerToggleHandler} />
      <SideDrawerContext.Provider value={{close: sideDrawerClosedHandler}}>
        <SideDrawer
          isAuth={props.isAuthenticated}
          open={sideDrawerState}
          hide={sideDrawerToggleHandler} />
      </SideDrawerContext.Provider>
        <main className={classes.content}>
          {props.children}
        </main>
    </Aux>
  )
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
};

export default connect(mapStateToProps)(Layout);
