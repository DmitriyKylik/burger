import React, {Component} from 'react';
import Aux from '../Auxilliary/auxilliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount () {
    // componentDidMount () {
      this.reqInterceptor = axios.interceptors.request.use( req => {
        this.setState( { error: null } );
        return req;
      } );
      this.resInterceptor = axios.interceptors.response.use( res => res, error => {
        this.setState( { error: error } );
      } );
    }

    componentWillUnmount () {
      axios.interceptors.request.eject( this.reqInterceptor );
      axios.interceptors.response.eject( this.resInterceptor );
    }

    errorConfirmedHandler = () => {
      this.setState( { error: null } );
    }

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
