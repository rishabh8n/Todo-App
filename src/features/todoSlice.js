import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

export const todoSlice = createSlice({
  name: "todo",
  initialState: data,
  reducers: {
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter((value, index) =>
        index === action.payload.index ? false : true
      );
    },
    addColumn: (state, action) => {
      state.boards[action.payload.index].columns.push(action.payload.column);
    },
    removeColumn: (state, action) => {
      state.boards[action.payload.index].columns = state.boards[
        action.payload.index
      ].columns.filter((value, index) =>
        index === action.payload.index ? false : true
      );
    },
  },
});

export default todoSlice.reducer;
