import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'

import { createResource } from '../../utils';
import { getTodosList } from '../../services';
import { useLocalStorageState } from '../../hooks';
import { setIsLoggedIn } from '../../features/session';
import { useErrorContext } from '../../context/ErrorContext';
import { Button, ToDoTables, Loading } from '../../components';

import { TO_DO_APP_SESSION } from '../../constants';

const createToDosResource = (errorFn) => {
  return createResource(getTodosList(errorFn));
}

const Todos = () => {
  const dispatch = useDispatch();
  const { setError: setGlobalError } = useErrorContext();
  const [toDos] = useState(() => createToDosResource(setGlobalError));
  const [localSession, setLocalSession] = useLocalStorageState(TO_DO_APP_SESSION);

  useEffect(() => {
    if (!localSession) {
      dispatch(setIsLoggedIn(false))
    }
  }, [dispatch, localSession]);

  const handleClick = () => setLocalSession(null);

  return (
    <React.Suspense fallback={<Loading />}>
      <div className="flex w-full h-screen flex-col items-center justify-start bg-gray-50">
        <div className="flex w-full h-16 justify-end">
          <Button onClick={handleClick}>Log out</Button>
        </div>

        <ToDoTables toDos={toDos} />

      </div>
    </React.Suspense >
  )
};

export default Todos;