import React, {Component} from 'react';
import Aux from '../Auxilliary/auxilliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use(null, req => {
        this.setState({error: null});
        return req;
      });
      this.respInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});
      });
    }

    state = {
      error: null
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.respInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} hide={this.errorConfirmedHandler}>
            <p style={{textAlign: 'center'}}>{this.state.error ? this.state.error.message : 'Something went wrong...' }</p>
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  }
};

export default withErrorHandler;
