import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import {
  changeActiveBoardId,
  selectActiveBoardId,
} from "../../features/activeBoardSlice";
import { changeActiveModal } from "../../features/modalsSlice";
import Column from "../column/column";
import { DragDropContext } from "react-beautiful-dnd";
import { dragAndDropTask } from "../../features/todoSlice";

function MainContainer() {
  const activeBoardId = useSelector(selectActiveBoardId);
  const columns = useSelector(
    (state) =>
      state.todo.boards.find((board) =>
        board.id === activeBoardId ? true : false
      )?.columns
  );
  const disptach = useDispatch();
  const dragNdrop = (results) => {
    disptach(
      dragAndDropTask({
        boardId: activeBoardId,
        sourceColumnId: results.source.droppableId,
        destColumnId: results.destination.droppableId,
        sourceIndex: results.source.index,
        destIndex: results.destination.index,
        taskId: results.draggableId,
      })
    );
  };
  if (activeBoardId === -1) {
    return (
      <div className="main-container">
        <h2 style={{ color: "var(--font-main)" }}>No Board Selected</h2>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={dragNdrop}>
      <div className="main-container">
        {columns && (
          <>
            {columns.map((column, index) => (
              <Column key={column.id} columnId={column.id} />
            ))}
            <div
              className="addColumn-btn"
              onClick={() => disptach(changeActiveModal({ name: "editBoard" }))}
            >
              + Add New Column
            </div>
          </>
        )}
      </div>
    </DragDropContext>
  );
}

export default MainContainer;
