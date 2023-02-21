import { createSlice } from "@reduxjs/toolkit";

export const activeBoardSlice = createSlice({
  name: "modal",
  initialState: {
    modalName: "",
    active: false,
  },
  reducers: {
    changeActiveModal: (state, action) => {
      state.modalName = action.payload;
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
  return state.modal.modalName;
};

export default activeBoardSlice.reducer;
