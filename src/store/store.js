import { configureStore } from '@reduxjs/toolkit';

import toDosReducer from '../features/toDoList';
import sessionReducer from '../features/session';

const store = configureStore({
    reducer: {
        toDos: toDosReducer,
        session: sessionReducer
    },
})

export default store;