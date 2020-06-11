import React, {Component} from 'react';

import Aux from '../../hoc/Auxilliary/auxilliary';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
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
        <Toolbar sideDrawerOpen={this.sideDrawerToggleHandler} />
        <SideDrawer open={this.state.showSideDrawer} hide={this.sideDrawerToggleHandler} />
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

export default Layout;
