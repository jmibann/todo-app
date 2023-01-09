import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faUndoAlt } from '@fortawesome/free-solid-svg-icons'

const ToDoItem = ({ children, completed = false, toggleTaskStatus }) => {
  const itemBaseClass = 'w-full my-2 p-2 rounded flex items-center justify-between';
  const itemClass = itemBaseClass.concat(` ${completed ? 'bg-green-300' : 'bg-red-300'}`);

  const buttonBaseClass = 'cursor-pointer py-1 px-2 border-2 border-gray-600 rounded-full border-opacity-50 shadow-md';
  const buttonClass = buttonBaseClass.concat(` ${completed
    ? 'bg-green-300 hover:border-red-500 hover:bg-red-300'
    : 'bg-red-300 hover:border-green-500 hover:bg-green-300'}`
  );

  return (
    <div className={itemClass}>
      <span className="w-10/12">
        {children}
      </span>

      <div className="flex items-center justify-around w-2/12 h-full">
        <div className={buttonClass} onClick={toggleTaskStatus} data-testid='action-icon'>
          <FontAwesomeIcon icon={completed ? faUndoAlt : faCheck} />
        </div>
      </div>
    </div>
  )
};

export default ToDoItem;