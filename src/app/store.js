import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import activeBoardReducer from "../features/activeBoardSlice";
import modalsReducer from "../features/modalsSlice";
import activeCoulumnReducer from "../features/activeColumnSlice";

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
  try {
    const todoState = JSON.stringify(state.todo);
    localStorage.setItem("todoState", todoState);
  } catch (e) {
    console.warn(e);
  }
}

const store = configureStore({
  reducer: {
    todo: todoReducer,
    activeBoard: activeBoardReducer,
    activeColumn: activeCoulumnReducer,
    modal: modalsReducer,
  },
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
