import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { Close, Down } from "../../assets/icons";
import {
  changeActiveBoardId,
  selectActiveBoardId,
} from "../../features/activeBoardSlice";
import { changeModalStatus } from "../../features/modalsSlice";
import { addTask } from "../../features/todoSlice";

function AddTask() {
  const activeBoardId = useSelector(selectActiveBoardId);
  const board = useSelector((state) =>
    state.todo.boards.find((board) => board.id === activeBoardId)
  );
  const disptach = useDispatch();
  const [dropDownActive, setDropDownActive] = useState(false);
  const [taskForm, setTaskForm] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    status: board.columns[0].name,
    statusId: board.columns[0].id,
    subtasks: [{ title: "", isCompleted: false }],
  });
  const addSubtask = () => {
    setTaskForm((prev) => {
      return {
        ...prev,
        subtasks: [...prev.subtasks, { title: "", isCompleted: false }],
      };
    });
  };
  const removeSubtask = (sIndex) => {
    setTaskForm((prev) => {
      return {
        ...prev,
        subtasks: prev.subtasks.filter((value, index) =>
          sIndex === index ? false : true
        ),
      };
    });
  };
  const handleChange = (e, index) => {
    setTaskForm((prev) => {
      const newSubtask = { ...prev };
      newSubtask.subtasks[index].title = e.target.value;
      return newSubtask;
    });
  };
  const createTask = () => {
    let formValid = true;
    if (!taskForm.title) {
      alert("Enter the task title");
      formValid = false;
    } else {
      taskForm.subtasks.forEach((subtask) => {
        if (!subtask.title) {
          alert("Enter column names");
          formValid = false;
          return;
        }
      });
    }
    if (formValid) {
      disptach(
        addTask({
          boardId: activeBoardId,
          columnId: taskForm.statusId,
          task: taskForm,
        })
      );
      disptach(changeModalStatus(false));
    }
  };
  return (
    <div
      className="modal addTask-modal"
      onClick={(e) => {
        e.stopPropagation();
        setDropDownActive(false);
      }}
    >
      <h2>Add New Task</h2>
      <label>
        Title
        <input
          type={"text"}
          value={taskForm.name}
          onChange={(e) =>
            setTaskForm((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
          placeholder="eg: Take Coffee Break"
        />
      </label>
      <label>
        Description
        <textarea
          rows={6}
          value={taskForm.description}
          onChange={(e) =>
            setTaskForm((prev) => {
              return { ...prev, description: e.target.value };
            })
          }
          placeholder="eg: It's always good to take a break. "
        ></textarea>
      </label>
      <label>
        Subtasks
        {taskForm.subtasks.map((subtask, index) => (
          <div key={index}>
            <input
              type={"text"}
              value={subtask.title}
              onChange={(e) => handleChange(e, index)}
              placeholder="eg: Make Coffee"
            />
            {taskForm.subtasks.length > 1 && (
              <button
                className="removeSub"
                onClick={() => removeSubtask(index)}
              >
                <Close />
              </button>
            )}
          </div>
        ))}
      </label>
      <button className="addColumn-btn1" onClick={addSubtask}>
        + Add Subtask
      </button>
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
          {taskForm.status}
          <Down />
          {dropDownActive && (
            <div className="dropDown-menu">
              {board.columns.map((column) => {
                return (
                  <button
                    key={column.id}
                    className="option-btn"
                    onClick={() =>
                      setTaskForm((prev) => ({
                        ...prev,
                        status: column.name,
                        statusId: column.id,
                      }))
                    }
                  >
                    {column.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <button onClick={createTask} className="add-btn">
        Add Task
      </button>
    </div>
  );
}

export default AddTask;
