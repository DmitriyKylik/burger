import React, { Component } from 'react';
import classes from './Backdrop.scss';

class backdrop extends Component {

  componentWillUnmount() {
    document.body.classList.remove('backdroped');
  }

  render() {
    let backDrop;

    if(this.props.show) {
      if(document.documentElement.clientWidth > 1025) {
        document.body.classList.add('backdroped');
      }
      backDrop = <div className={classes.backDrop} onClick={this.props.clicked}></div>
    } else {
      if(document.documentElement.clientWidth > 1025) {
        document.body.classList.remove('backdroped');
      }
      backDrop = null;
    }
    return backDrop;
  }
}

export default backdrop;
