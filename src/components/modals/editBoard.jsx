import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "../../assets/icons";
import { v4 as uuidv4 } from "uuid";
import { selectActiveBoardId } from "../../features/activeBoardSlice";
import { editBoard } from "../../features/todoSlice";
import { changeModalStatus } from "../../features/modalsSlice";

function EditBoard() {
  const activeBoardId = useSelector(selectActiveBoardId);
  const boardDetails = useSelector((state) =>
    state.todo.boards.find((board) =>
      board.id === activeBoardId ? true : false
    )
  );
  const [newBoardDetails, setNewBoardDetails] = useState(
    JSON.parse(JSON.stringify(boardDetails))
  );
  const dispatch = useDispatch();
  const addColumn = () => {
    setNewBoardDetails((prev) => {
      return {
        ...prev,
        columns: [...prev.columns, { id: uuidv4(), name: "", tasks: [] }],
      };
    });
  };
  const removeColumn = (cIndex) => {
    setNewBoardDetails((prev) => {
      return {
        ...prev,
        columns: prev.columns.filter((value, index) =>
          cIndex === index ? false : true
        ),
      };
    });
  };
  const handleChange = (e, index) => {
    setNewBoardDetails((prev) => {
      const newColumn = { ...prev };
      newColumn.columns[index].name = e.target.value;
      return newColumn;
    });
  };
  const save = () => {
    let formValid = true;
    if (!newBoardDetails.name) {
      alert("Enter the name for the board");
      formValid = false;
    } else {
      newBoardDetails.columns.forEach((column) => {
        if (!column.name) {
          alert("Enter column names");
          formValid = false;
          return;
        }
      });
    }
    if (formValid) {
      dispatch(editBoard({ id: boardDetails.id, board: newBoardDetails }));
      dispatch(changeModalStatus(false));
    }
  };
  return (
    <div className="modal editBoard-modal" onClick={(e) => e.stopPropagation()}>
      <h2>Add Board</h2>
      <label>
        Name
        <input
          type={"text"}
          value={newBoardDetails.name}
          onChange={(e) =>
            setNewBoardDetails((prev) => {
              return { ...prev, name: e.target.value };
            })
          }
          placeholder="eg: Develop Software"
        />
      </label>
      <label>
        Columns
        {newBoardDetails.columns.map((column, index) => (
          <div key={column.id}>
            <input
              type={"text"}
              value={column.name}
              onChange={(e) => handleChange(e, index)}
              placeholder="eg: Todo"
            />
            {newBoardDetails.columns.length > 1 && (
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
      <button onClick={save} className="save-btn">
        Save Changes
      </button>
      <button
        className="cancel"
        onClick={() => dispatch(changeModalStatus(false))}
      >
        Cancel
      </button>
    </div>
  );
}

export default EditBoard;
