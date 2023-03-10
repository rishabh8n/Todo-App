import { createSlice } from "@reduxjs/toolkit";

export const activeBoardSlice = createSlice({
  name: "activeBoardId",
  initialState: {
    id: "0",
  },
  reducers: {
    changeActiveBoardId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { changeActiveBoardId } = activeBoardSlice.actions;

export const selectActiveBoardId = (state) => {
  return state.activeBoard.id;
};

export default activeBoardSlice.reducer;
