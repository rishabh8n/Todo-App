import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import activeBoardReducer from "../features/activeBoardSlice";

export default configureStore({
  reducer: {
    todo: todoReducer,
    activeBoard: activeBoardReducer,
  },
});
