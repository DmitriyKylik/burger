import React, {Component} from 'react';
import propTypes from 'prop-types';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      //function
      importComponent()
        .then(cmp => {
          this.setState({component: cmp.default});
        })
        .catch(error => console.log(error));
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }
}

asyncComponent.propTypes = {
  importComponent: propTypes.func,
}

export default asyncComponent;
