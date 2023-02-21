import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBoard } from "../../features/activeBoardSlice";
import { changeActiveModal } from "../../features/modalsSlice";

import "./styles.css";

function Column({ columnIndex }) {
  const activeBoard = useSelector(selectActiveBoard);
  const tasksColumn = useSelector(
    (state) => state.todo.boards[activeBoard].columns[columnIndex]
  );
  const dispatch = useDispatch();
  console.log(tasksColumn);
  return (
    <div className="column">
      <p className="title">{tasksColumn.name}</p>
      {tasksColumn.tasks.map((task, index) => {
        let subtaskLength = task.subtasks.length;
        let completedSubtask = task.subtasks.reduce((count, sub) => {
          return sub.isCompleted ? ++count : count;
        }, 0);
        return (
          <div
            className="task"
            key={index}
            onClick={() => dispatch(changeActiveModal("viewTask"))}
          >
            <p className="task-title">{task.title}</p>
            <p className="subtask-count">
              {completedSubtask} of {subtaskLength} subtasks
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Column;
