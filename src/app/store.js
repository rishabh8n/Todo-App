import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import activeBoardReducer from "../features/activeBoardSlice";
import modalsReducer from "../features/modalsSlice";
import activeCoulumnReducer from "../features/activeColumnSlice";

export default configureStore({
  reducer: {
    todo: todoReducer,
    activeBoard: activeBoardReducer,
    activeColumn: activeCoulumnReducer,
    modal: modalsReducer,
  },
});
