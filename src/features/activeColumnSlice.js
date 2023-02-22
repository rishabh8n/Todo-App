import { createSlice } from "@reduxjs/toolkit";

export const activeBoardSlice = createSlice({
  name: "activeColumnId",
  initialState: {
    id: "0",
  },
  reducers: {
    changeActiveColumnId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { changeActiveColumnId } = activeBoardSlice.actions;

export const selectActiveColumnId = (state) => {
  return state.activeColumn.id;
};

export default activeBoardSlice.reducer;
