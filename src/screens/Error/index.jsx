import React from 'react';

const ErrorScreen = ({ errorContext }) => {
  return (<div className="bg-gray-100 flex flex-col w-full h-screen justify-center items-center text-xl font-bold text-red-500">
    <span>Error during API request</span>
    <span>Error code: {errorContext.status}</span>
    <span>{errorContext.message}</span>
  </div>)
};

export default ErrorScreen;