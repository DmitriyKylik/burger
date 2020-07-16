import React, { useEffect, useState } from 'react';
import Aux from '../Auxilliary/auxilliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
  return props => {
    const [errorState, setErrorState] = useState(null);
    const reqInterceptor = axios.interceptors.request.use( req => {
      setErrorState(null);
      return req;
    } );
    const respInterceptor = axios.interceptors.response.use( res => res, err => {
      setErrorState(err);
    } );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject( reqInterceptor );
        axios.interceptors.response.eject( respInterceptor );
      };
    }, [reqInterceptor, respInterceptor]);

    const errorConfirmedHandler = () => {
      setErrorState(null);
    };

    return (
      <Aux>
        <Modal
          show={errorState}
          hide={errorConfirmedHandler}>
          {errorState ? errorState.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
