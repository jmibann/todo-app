import React from 'react';

const Button = ({ children, onClick, ...props }) => {
  const buttonClass = "my-4 w-1/4 rounded bg-blue-500 text-white font-medium"
  return (<button className={buttonClass} onClick={onClick} {...props} >
    {children}
  </button>
  )
};

export default Button;