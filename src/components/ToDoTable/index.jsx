import React from 'react';

import { ToDoItem } from '../../components';

const Table = ({ todos, title, toggleTaskStatus, completed = false }) => {

  const tableClassBase = "w-1/2 h-full flex flex-col justify-start items-start  p-4 mx-8 border border-gray-300 rounded overflow-auto"
  const tableClass = tableClassBase.concat(` ${completed ? 'bg-green-50' : 'bg-red-50'}`);

  return (
    <div className={tableClass} >
      <span className="w-full text-center font-semibold text-xl">{title}</span>
      {todos.map((task) =>
        <ToDoItem
          key={`task-${task.id}`}
          completed={task.completed}
          toggleTaskStatus={() => toggleTaskStatus({ ...task })}
        >
          {task.title}
        </ToDoItem>)
      }
    </div>
  )
};

export default Table;