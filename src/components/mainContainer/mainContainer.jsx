import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import {
  changeActiveBoard,
  selectActiveBoard,
} from "../../features/activeBoardSlice";
import { changeActiveModal } from "../../features/modalsSlice";
import Column from "../column/column";

function MainContainer() {
  const activeBoard = useSelector(selectActiveBoard);
  const columns = useSelector(
    (state) => state.todo.boards[activeBoard].columns
  );
  const disptach = useDispatch();

  return (
    <div className="main-container">
      {columns.map((column, index) => (
        <Column key={index} columnIndex={index} />
      ))}
      <div
        className="addColumn-btn"
        onClick={() => disptach(changeActiveModal("addColumn"))}
      >
        + Add New Column
      </div>
    </div>
  );
}

export default MainContainer;
