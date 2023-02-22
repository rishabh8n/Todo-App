import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveBoardId,
  selectActiveBoardId,
} from "../../features/activeBoardSlice";
import { selectActiveColumnId } from "../../features/activeColumnSlice";
import { changeModalStatus } from "../../features/modalsSlice";
import { deleteBoard, deleteTask } from "../../features/todoSlice";

function DeleteTask({ taskId }) {
  const activeBoardId = useSelector(selectActiveBoardId);
  const activeColumnId = useSelector(selectActiveColumnId);
  const task = useSelector((state) =>
    state.todo.boards
      .find((board) => board.id === activeBoardId)
      ?.columns.find((column) => column.id === activeColumnId)
      .tasks.find((task) => task.id === taskId)
  );
  const dispatch = useDispatch();
  return (
    <div
      className="modal deleteTask-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Delete This Task</h2>
      <p>
        Are you sure you want to delete the selected task? This action will
        remove all columns and tasks and cannot be reversed.
      </p>
      <div>
        <button
          className="confirm"
          onClick={() => {
            dispatch(
              deleteTask({
                boardId: activeBoardId,
                columnId: activeColumnId,
                taskId,
              })
            );
            dispatch(changeModalStatus());
          }}
        >
          Confirm
        </button>
        <button
          className="cancel"
          onClick={() => dispatch(changeModalStatus())}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteTask;
