import { createSlice } from "@reduxjs/toolkit";

export const activeBoardSlice = createSlice({
  name: "modal",
  initialState: {
    modalName: "",
    taskId: "0",
    active: false,
  },
  reducers: {
    changeActiveModal: (state, action) => {
      state.modalName = action.payload.name;
      state.taskId = action.payload.taskId || 0;
      state.active = true;
    },
    changeModalStatus: (state) => {
      state.active = !state.active;
    },
  },
});

export const { changeActiveModal, changeModalStatus } =
  activeBoardSlice.actions;

export const selectActiveModal = (state) => {
  return state.modal;
};

export default activeBoardSlice.reducer;
