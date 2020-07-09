import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary/auxilliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import SideDrawerContext from '../../context/sideDrawerContext';
import classes from './Layout.scss';

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState( { showSideDrawer: false } );
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuthenticated} sideDrawerOpen={this.sideDrawerToggleHandler} />
        <SideDrawerContext.Provider value={{close: this.sideDrawerClosedHandler}}>
          <SideDrawer
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer}
            hide={this.sideDrawerToggleHandler} />
        </SideDrawerContext.Provider>
          <main className={classes.content}>
            {this.props.children}
          </main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
};

export default connect(mapStateToProps)(Layout);
