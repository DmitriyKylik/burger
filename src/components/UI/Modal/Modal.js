import React, {Component} from 'react';
import classes from './Modal.scss';
import Aux from '../../../hoc/Auxilliary/auxilliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props.show !== nextProps.show;
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    console.log('[Modal.js] will update...');
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.hide}  />
        <div className={`${classes.Modal} ${this.props.show ? classes.active : ''}`}>
          <div className={classes.closeBtn} onClick={this.props.hide}>
            <svg className={classes.icon} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000">
              <g>
                <polygon
                  points="990,85.9 914.2,9.9 500,424.2 85.8,9.9 10,85.8 424.2,500 10,914.2 85.8,990.1 500,575.8 914.2,990.1 990,914.1 575.9,500 "/>
              </g>
            </svg>
          </div>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
