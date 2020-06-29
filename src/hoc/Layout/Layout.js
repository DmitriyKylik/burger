import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary/auxilliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    showSideDrawer: false,
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuthenticated} sideDrawerOpen={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          hide={this.sideDrawerToggleHandler} />
        {/*<BackDrop show={this.state.backDropShow} clicked={this.toggleBackDropHandler}/>*/}
        {/*<ModalContext.Provider value={{show: this.state.backDropShow, toggleShow: this.toggleBackDropHandler}}>*/}
          <main className={classes.Content}>
            {this.props.children}
          </main>
        {/*</ModalContext.Provider>*/}
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
