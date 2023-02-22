import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBoardId } from "../../features/activeBoardSlice";
import { changeActiveColumnId } from "../../features/activeColumnSlice";
import { changeActiveModal } from "../../features/modalsSlice";

import "./styles.css";

function Column({ columnId }) {
  const activeBoardId = useSelector(selectActiveBoardId);
  const tasksColumn = useSelector((state) =>
    state.todo.boards
      .find((board) => (board.id === activeBoardId ? true : false))
      ?.columns.find((column) => (column.id === columnId ? true : false))
  );
  const dispatch = useDispatch();
  return (
    <div className={`column`}>
      <p className="title">{tasksColumn.name}</p>
      <Droppable key={columnId.toString()} droppableId={columnId.toString()}>
        {(provided, snapshot) => (
          <div
            className={`task-container ${
              tasksColumn.tasks.length === 0 ? "empty" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasksColumn.tasks.map((task, index) => {
              let subtaskLength = task.subtasks.length;
              let completedSubtask = task.subtasks.reduce((count, sub) => {
                return sub.isCompleted ? ++count : count;
              }, 0);
              return (
                <Draggable
                  key={task.id.toString()}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="task"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // key={task.id}
                      onClick={() => {
                        dispatch(changeActiveColumnId(columnId));
                        dispatch(
                          changeActiveModal({
                            name: "viewTask",
                            taskId: task.id,
                          })
                        );
                      }}
                    >
                      <p className="task-title">{task.title}</p>
                      <p className="subtask-count">
                        {completedSubtask} of {subtaskLength} subtasks
                      </p>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
