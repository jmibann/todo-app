import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'

import { useLocalStorageState } from '../../hooks';
import { setIsLoggedIn } from '../../features/session'

import { TO_DO_APP_SESSION } from '../../constants';

const Login = () => {
  const dispatch = useDispatch();
  const [ localSession , setLocalSession] = useLocalStorageState(TO_DO_APP_SESSION);
  
  useEffect(() => {
    if(localSession){
      dispatch(setIsLoggedIn(true));
    }
  }, [dispatch, localSession]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { user, password } = event.target.elements;

    setLocalSession({
      user: user.value,
      password: password.value
    });
  }

  return (
    <div className="flex w-full h-screen flex-col items-center justify-center">
      <form className="flex w-1/2 flex-col justify-center items-center" onSubmit={handleSubmit}>
        <div className="flex w-full my-4 font-medium justify-center" >
          <label htmlFor="user" className="w-1/4" >User</label>
          <input id="user" className="w-1/3 border border-blue-500 border-opacity-50 rounded" />
        </div>

        <div className="flex w-full font-medium justify-center" >
          <label htmlFor="password" className="w-1/4">Password</label>
          <input id="password" type="password" className="w-1/3 border border-blue-500 border-opacity-50 rounded" />
        </div>

        <button type="submit" className="my-4 w-1/4 rounded bg-blue-500 text-white font-medium" >Log In</button>
      </form>
    </div>
  )
};

export default Login