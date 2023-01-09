import { createSlice } from '@reduxjs/toolkit';

export const toDoListSlice = createSlice({
    name: 'todoList',
    initialState: {
        toDoList: [],
    },
    reducers: {
        setToDoList: (state, action) => {
            state.toDoList = action.payload;
        },
    }
});

export const { setToDoList } = toDoListSlice.actions;

export default toDoListSlice.reducer;