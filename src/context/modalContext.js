import React from 'react';

const modalContext = React.createContext({
  show: false,
  toggleShow: () => {},
});

export default modalContext;
