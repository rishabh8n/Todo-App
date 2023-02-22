import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveBoardId,
  selectActiveBoardId,
} from "../../features/activeBoardSlice";
import { changeModalStatus } from "../../features/modalsSlice";
import { deleteBoard } from "../../features/todoSlice";

function DeleteBoard() {
  const activeBoardId = useSelector(selectActiveBoardId);
  const boardsLength = useSelector((state) => state.todo.boards.length);
  const boardName = useSelector(
    (state) =>
      state.todo.boards.find((board) =>
        board.id === activeBoardId ? true : false
      )?.name
  );
  const dispatch = useDispatch();
  return (
    <div
      className="modal deleteBoard-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Delete This Board</h2>
      <p>
        Are you sure you want to delete the '{boardName}' board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div>
        <button
          className="confirm"
          onClick={() => {
            dispatch(deleteBoard({ id: activeBoardId }));
            dispatch(changeModalStatus());
            dispatch(changeActiveBoardId(-1));
            // if (activeBoard === boardsLength - 1) {
            //   dispatch(changeActiveBoard(activeBoard - 1));
            // }
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

export default DeleteBoard;
