import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import activeBoardReducer from "../features/activeBoardSlice";
import modalsReducer from "../features/modalsSlice";

export default configureStore({
  reducer: {
    todo: todoReducer,
    activeBoard: activeBoardReducer,
    modal: modalsReducer,
  },
});
