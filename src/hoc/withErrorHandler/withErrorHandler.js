import React, { Component, useEffect, useState } from 'react';
import Aux from '../Auxilliary/auxilliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
  // return class extends Component {
  return (props) => {
    // state = {
    //   error: null
    // };
    const [errorState, setErrorState] = useState(null);
    let reqInterceptor = null;
    let respInterceptor = null;
debugger;
    useEffect(() => {
      reqInterceptor = axios.interceptors.request.use( req => {
        setErrorState(null);
        // this.setState( { error: null } );
        return req;
      } );
      respInterceptor = axios.interceptors.response.use( res => res, error => {
        setErrorState(error);
        // this.setState( { error: error } );
      } );
      return () => {
        axios.interceptors.request.eject( reqInterceptor );
        axios.interceptors.response.eject( respInterceptor );
      };
    }, [errorState, reqInterceptor, respInterceptor]);


    // componentWillMount () {
    // componentDidMount () {
    //   this.reqInterceptor = axios.interceptors.request.use( req => {
    //     this.setState( { error: null } );
    //     return req;
    //   } );
    //   this.resInterceptor = axios.interceptors.response.use( res => res, error => {
    //     this.setState( { error: error } );
    //   } );
    // };

    // componentWillUnmount () {
    //   axios.interceptors.request.eject( this.reqInterceptor );
    //   axios.interceptors.response.eject( this.resInterceptor );
    // };

    const errorConfirmedHandler = () => {
      setErrorState(null);
      // this.setState( { error: null } );
    };

    // render () {
      return (
        <Aux>
          <Modal
            show={errorState}
            modalClosed={errorConfirmedHandler}>
            {errorState ? errorState.message : null}
          </Modal>
          <WrappedComponent {...props} />
        </Aux>
      );
    // }
  };
};

export default withErrorHandler;
