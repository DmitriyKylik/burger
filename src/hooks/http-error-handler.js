import { useEffect, useState } from 'react';

export default httpClient => {
  const [error, setErrorState] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use( req => {
    setErrorState(null);
    return req;
  } );
  const respInterceptor = httpClient.interceptors.response.use( res => res, err => {
    setErrorState(err);
  } );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject( reqInterceptor );
      httpClient.interceptors.response.eject( respInterceptor );
    };
  }, [reqInterceptor, respInterceptor]);

  const errorConfirmedHandler = () => {
    setErrorState(null);
  };

  return [error, errorConfirmedHandler];
};
