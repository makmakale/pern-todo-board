import { createSlice } from '@reduxjs/toolkit';

const notifySlice = createSlice({
  name: 'notify',
  initialState: { type: null, message: null },
  reducers: {
    setNotification: (state, action) => {
      const { type = null, message } = action.payload;
      state.type = type;
      state.message = message;
    },
    clearNotification: (state) => {
      state.type = null;
      state.message = null;
    },
  },
});

export const { setNotification, clearNotification } = notifySlice.actions;

export default notifySlice.reducer;

export const selectNotification = (state) => state.notify;
