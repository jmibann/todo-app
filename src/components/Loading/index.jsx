import React from 'react';

const Loading = ({ size = 'regular' }) => {
  const base =
    'border border-gray-400 border-t-primary-background border-b-primary-background rounded-full box-border animate-spin-slow';

  const loadingStyle = {
    larger: 'w-32 h-32 border-8',
    large: 'w-24 h-24 border-4',
    regular: 'h-24 w-24 border-4',
    small: 'h-12 w-12 border',
    xsm: 'h-6 w-6 border',
  };

  const clx = base.concat(` ${loadingStyle[size]}`);

  return (<div className="flex w-full h-screen justify-center items-center">
    <div className={clx} />
  </div>)
};

export default Loading;