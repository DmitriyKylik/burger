import React, {Component} from 'react';

import Aux from '../../hoc/auxilliary';
import BackDrop from '../UI/Backdrop/Backdrop';
import ModalContext from '../../context/modalContext';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    backDropShow: false,
  };



  toggleBackDropHandler = () => {
    console.log('Clicked!');
    this.setState({backDropShow: !this.state.backDropShow});
    document.body.classList.toggle('backdroped');
  };

  render() {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer open={this.state.backDropShow} />
        <BackDrop show={this.state.backDropShow} clicked={this.toggleBackDropHandler}/>
        <ModalContext.Provider value={{show: this.state.backDropShow, toggleShow: this.toggleBackDropHandler}}>
          <main className={classes.Content}>
            {this.props.children}
          </main>
        </ModalContext.Provider>
      </Aux>
    )
  }
}

export default Layout;


// const layout = (props) => (
//   <Aux>
//     <div>Toolbar, SiderDrawer, Backdrop</div>
//     <main className={classes.Content}>
//       {props.children}
//     </main>
//   </Aux>
// );
