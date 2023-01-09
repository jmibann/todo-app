import React, { createContext, useContext, useState } from 'react';

import ErrorScreen from '../screens/Error';

const ErrorStatusContext = createContext({});

const ErrorContext = ({ children }) => {
  const [errorContext, setErrorContext] = useState(null);

  const setError = (error) => setErrorContext(error);

  const renderContent = () => {
    if (errorContext) {
      switch (errorContext.status) {
        case 401:
          return <ErrorScreen errorContext={errorContext} />;
        default:
          return <ErrorScreen errorContext={errorContext} />;
      }
    }

    return children;
  };

  const contextPayload = React.useMemo(() => ({ setErrorContext }), [setErrorContext]);

  return (
    <ErrorStatusContext.Provider value={{ ...contextPayload, setError }}>
      {renderContent()}
    </ErrorStatusContext.Provider>
  );
};

const useErrorContext = () => useContext(ErrorStatusContext);

export { ErrorContext, useErrorContext };