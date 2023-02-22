import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "../../assets/icons";
import {
  changeActiveBoardId,
  selectActiveBoardId,
} from "../../features/activeBoardSlice";
import { changeModalStatus } from "../../features/modalsSlice";
import { addBoard } from "../../features/todoSlice";

function AddBoard() {
  const activeBoardId = useSelector(selectActiveBoardId);
  const boardsLength = useSelector((state) => state.todo.boards.length);
  const disptach = useDispatch();
  const [boardForm, setBoardForm] = useState({
    id: uuidv4(),
    name: "",
    columns: [{ id: uuidv4(), name: "", tasks: [] }],
  });
  const addColumn = () => {
    setBoardForm((prev) => {
      return {
        ...prev,
        columns: [...prev.columns, { id: uuidv4(), name: "", tasks: [] }],
      };
    });
  };
  const removeColumn = (cIndex) => {
    setBoardForm((prev) => {
      return {
        ...prev,
        columns: prev.columns.filter((value, index) =>
          cIndex === index ? false : true
        ),
      };
    });
  };
  const handleChange = (e, index) => {
    setBoardForm((prev) => {
      const newColumn = { ...prev };
      newColumn.columns[index].name = e.target.value;
      return newColumn;
    });
  };
  const createBoard = () => {
    let formValid = true;
    if (!boardForm.name) {
      alert("Enter the name for the board");
      formValid = false;
    } else {
      boardForm.columns.forEach((column) => {
        if (!column.name) {
          alert("Enter column names");
          formValid = false;
          return;
        }
      });
    }
    if (formValid) {
      disptach(addBoard(boardForm));
      disptach(changeActiveBoardId(boardForm.id));
      disptach(changeModalStatus(false));
    }
  };
  return (
    <div className="modal addBoard-modal" onClick={(e) => e.stopPropagation()}>
      <h2>Add Board</h2>
      <label>
        Name
        <input
          type={"text"}
          value={boardForm.name}
          onChange={(e) =>
            setBoardForm((prev) => {
              return { ...prev, name: e.target.value };
            })
          }
          placeholder="eg: Develop Software"
        />
      </label>
      <label>
        Columns
        {boardForm.columns.map((column, index) => (
          <div key={index}>
            <input
              type={"text"}
              value={column.name}
              onChange={(e) => handleChange(e, index)}
              placeholder="eg: Todo"
            />
            {boardForm.columns.length > 1 && (
              <button className="removeCol" onClick={() => removeColumn(index)}>
                <Close />
              </button>
            )}
          </div>
        ))}
      </label>
      <button className="addColumn-btn1" onClick={addColumn}>
        + Add Column
      </button>
      <button onClick={createBoard} className="add-btn">
        Create Board
      </button>
    </div>
  );
}

export default AddBoard;
