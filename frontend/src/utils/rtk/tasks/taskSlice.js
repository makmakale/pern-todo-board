import { setInitialBoards } from '@/utils/board';
import { DEFAULT_BOARDS } from '@/utils/constants';
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { boards: DEFAULT_BOARDS, currentTask: null },
  reducers: {
    setBoards: (state, action) => {
      state.boards = setInitialBoards(state.boards, action.payload);
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
  },
});

export const { setBoards, setCurrentTask } = taskSlice.actions;

export default taskSlice.reducer;

export const selectTasks = (state) => state.tasks.boards;
export const selectCurrentTask = (state) => state.tasks.currentTask;
