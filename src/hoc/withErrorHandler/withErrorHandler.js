import React, {Component} from 'react';
import Aux from '../Auxilliary/auxilliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    };

    componentDidMount() {
      axios.interceptors.request.use(null, req => {
        this.setState({error: null});
        return req;
      });
      axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});

      });
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} hide={this.errorConfirmedHandler}>
            <p style={{textAlign: 'center'}}>{this.state.error ? this.state.error.message : null}</p>
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  }
};

export default withErrorHandler;
