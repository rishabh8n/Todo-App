import { createSlice } from "@reduxjs/toolkit";

export const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState: {
    index: 0,
  },
  reducers: {
    changeActiveBoard: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const { changeActiveBoard } = activeBoardSlice.actions;

export const selectActiveBoard = (state) => {
  return state.activeBoard.index;
};

export default activeBoardSlice.reducer;
