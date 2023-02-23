import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const todoState = localStorage.getItem("todoState");
    if (todoState === null) return undefined;
    return JSON.parse(todoState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
const storedData = loadFromLocalStorage();

export const todoSlice = createSlice({
  name: "todo",
  initialState: storedData ? storedData : data,
  reducers: {
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter((board, index) =>
        board.id === action.payload.id ? false : true
      );
    },
    editBoard: (state, action) => {
      let index = state.boards.findIndex((board) =>
        board.id === action.payload.id ? true : false
      );
      state.boards[index] = action.payload.board;
    },
    addTask: (state, action) => {
      let boardIndex = state.boards.findIndex(
        (board) => board.id === action.payload.boardId
      );
      let columnIndex = state.boards[boardIndex].columns.findIndex(
        (column) => column.id === action.payload.columnId
      );
      state.boards[boardIndex].columns[columnIndex].tasks.push(
        action.payload.task
      );
    },
    changeTaskStatus: (state, action) => {
      let boardIndex = state.boards.findIndex(
        (board) => board.id === action.payload.boardId
      );
      let sourceColumnIndex = state.boards[boardIndex].columns.findIndex(
        (column) => column.id === action.payload.sourceColumnId
      );
      let destColumnIndex = state.boards[boardIndex].columns.findIndex(
        (column) => column.id === action.payload.destColumnId
      );
      const task = state.boards[boardIndex].columns[
        sourceColumnIndex
      ].tasks.find((task) => task.id === action.payload.taskId);
      task.status = state.boards[boardIndex].columns[destColumnIndex].name;
      task.statusId = state.boards[boardIndex].columns[destColumnIndex].id;
      state.boards[boardIndex].columns[sourceColumnIndex].tasks = state.boards[
        boardIndex
      ].columns[sourceColumnIndex].tasks.filter((t) => t.id !== task.id);
      state.boards[boardIndex].columns[destColumnIndex].tasks.push(task);
    },
    dragAndDropTask: (state, action) => {
      let boardIndex = state.boards.findIndex(
        (board) => board.id === action.payload.boardId
      );
      let sourceColumnIndex = state.boards[boardIndex].columns.findIndex(
        (column) => column.id === action.payload.sourceColumnId
      );
      let destColumnIndex = state.boards[boardIndex].columns.findIndex(
        (column) => column.id === action.payload.destColumnId
      );
      const task = state.boards[boardIndex].columns[
        sourceColumnIndex
      ].tasks.find((task) => task.id === action.payload.taskId);

      state.boards[boardIndex].columns[sourceColumnIndex].tasks.splice(
        action.payload.sourceIndex,
        1
      );
      state.boards[boardIndex].columns[destColumnIndex].tasks.splice(
        action.payload.destIndex,
        0,
        task
      );
    },
    changeSubtaskStatus: (state, action) => {
      let boardIndex = state.boards.findIndex(
        (board) => board.id === action.payload.boardId
      );
      let columnIndex = state.boards[boardIndex].columns.findIndex(
        (column) => column.id === action.payload.columnId
      );
      const taskIndex = state.boards[boardIndex].columns[
        columnIndex
      ].tasks.findIndex((task) => task.id === action.payload.taskId);

      state.boards[boardIndex].columns[columnIndex].tasks[taskIndex].subtasks[
        action.payload.subtaskIndex
      ].isCompleted =
        !state.boards[boardIndex].columns[columnIndex].tasks[taskIndex]
          .subtasks[action.payload.subtaskIndex].isCompleted;
    },
    deleteTask: (state, action) => {
      let boardIndex = state.boards.findIndex(
        (board) => board.id === action.payload.boardId
      );
      let columnIndex = state.boards[boardIndex].columns.findIndex(
        (column) => column.id === action.payload.columnId
      );
      const taskIndex = state.boards[boardIndex].columns[
        columnIndex
      ].tasks.findIndex((task) => task.id === action.payload.taskId);

      state.boards[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 1);
    },
  },
});

export const {
  addBoard,
  deleteBoard,
  editBoard,
  addTask,
  changeTaskStatus,
  changeSubtaskStatus,
  dragAndDropTask,
  deleteTask,
} = todoSlice.actions;

export default todoSlice.reducer;
