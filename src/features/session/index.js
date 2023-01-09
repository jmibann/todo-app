import { createSlice } from '@reduxjs/toolkit';

export const session = createSlice({
  name: 'session',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  }
});

export const { setIsLoggedIn } = session.actions;

export default session.reducer;