import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { updateTask } from '../../services';
import { ToDoTable } from '../../components';
import { useErrorContext } from '../../context/ErrorContext';
import { setToDoList } from '../../features/toDoList';
import { USER_ID} from '../../constants';


function ToDoTables({ toDos }) {
  const list = toDos.read();

  const dispatch = useDispatch();
  const { setError: setGlobalError } = useErrorContext();

  const toDoList = useSelector(state => state.toDos.toDoList);
  
  useEffect(() => {
    dispatch(setToDoList(list));
  }, [dispatch, list])

  const completed = toDoList.filter(({ userId, completed }) => userId === USER_ID && completed);
  const uncompleted = toDoList.filter(({ userId, completed }) => userId === USER_ID && !completed);

  const toggleTaskStatus = (toDo) => {
    updateTask(toDo, setGlobalError)
      .then(updatedTask => {
        const newTodoList = toDoList.filter(task => task?.id !== updatedTask?.id);
        const updatedToDoList = [updatedTask, ...newTodoList];
        dispatch(setToDoList(updatedToDoList));
      })
  }

  return (
    <div className="flex items-center justify-center w-full h-5/6" data-testid='table-container'>
      <ToDoTable todos={uncompleted} title="Uncompleted Tasks" toggleTaskStatus={toggleTaskStatus} />
      <ToDoTable todos={completed} title="Completed Tasks" toggleTaskStatus={toggleTaskStatus} completed />
    </div>
  )
}

export default ToDoTables;