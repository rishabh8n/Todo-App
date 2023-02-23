import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Down, Menu } from "../../assets/icons";
import { selectActiveBoardId } from "../../features/activeBoardSlice";
import {
  changeActiveColumnId,
  selectActiveColumnId,
} from "../../features/activeColumnSlice";
import { changeActiveModal } from "../../features/modalsSlice";
import {
  changeSubtaskStatus,
  changeTaskStatus,
} from "../../features/todoSlice";

function ViewTask({ taskId }) {
  const [dropDownActive, setDropDownActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useDispatch();

  const activeBoardId = useSelector(selectActiveBoardId);
  const activeCoulumnId = useSelector(selectActiveColumnId);
  const columns = useSelector(
    (state) =>
      state.todo.boards.find((board) => board.id === activeBoardId).columns
  );
  const task = useSelector((state) =>
    state.todo.boards
      .find((board) => board.id === activeBoardId)
      ?.columns.find((column) => column.id === activeCoulumnId)
      .tasks.find((task) => task.id === taskId)
  );
  return (
    <div
      className="modal viewTask-modal"
      onClick={(e) => {
        e.stopPropagation();
        setDropDownActive(false);
      }}
    >
      <h2>{task.title}</h2>
      <button className="menu" onClick={() => setMenuActive((prev) => !prev)}>
        <Menu />
      </button>
      {menuActive && (
        <>
          <div className="overlay" onClick={() => setMenuActive(false)}></div>
          <div className="dropdown">
            <button
              onClick={() => {
                dispatch(
                  changeActiveModal({ name: "deleteTask", taskId: taskId })
                );
                setMenuActive(false);
              }}
              className="deleteTask"
            >
              Delete Task
            </button>
          </div>
        </>
      )}

      <p>{task.description}</p>
      <div className="subtasks-container">
        <h3>Subtasks</h3>
        {task.subtasks.map((subtask, index) => (
          <div
            className={`subtask-item ${subtask.isCompleted ? "completed" : ""}`}
            key={index}
            onClick={() =>
              dispatch(
                changeSubtaskStatus({
                  boardId: activeBoardId,
                  columnId: activeCoulumnId,
                  taskId: task.id,
                  subtaskIndex: index,
                })
              )
            }
          >
            <input type="checkbox" checked={subtask.isCompleted} readOnly />
            {subtask.title}
          </div>
        ))}
      </div>
      <div>
        <p
          onClick={(e) => {
            e.stopPropagation();
            setDropDownActive(true);
          }}
        >
          Status
        </p>
        <div
          className={`status-dropDown ${dropDownActive ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setDropDownActive((prev) => !prev);
          }}
        >
          {task.status}
          <Down />
          {dropDownActive && (
            <div className="dropDown-menu">
              {columns.map((column) => {
                return (
                  <button
                    key={column.id}
                    className="option-btn"
                    onClick={() => {
                      dispatch(
                        changeTaskStatus({
                          boardId: activeBoardId,
                          sourceColumnId: activeCoulumnId,
                          destColumnId: column.id,
                          taskId: task.id,
                        })
                      );
                      dispatch(changeActiveColumnId(column.id));
                    }}
                  >
                    {column.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
