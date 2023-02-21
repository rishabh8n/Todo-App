import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "../../assets/icons";
import { selectActiveBoard } from "../../features/activeBoardSlice";
import { changeActiveModal } from "../../features/modalsSlice";
import "./styles.css";

function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const activeBoard = useSelector(selectActiveBoard);
  const board = useSelector((state) => state.todo.boards[activeBoard]);
  const dispatch = useDispatch();
  return (
    <>
      <div className="header">
        <h1>{board.name}</h1>
        <button className="addTask-btn">+ Add New Task</button>
        <div>
          <button
            className="menu"
            onClick={() => setMenuActive((prev) => !prev)}
          >
            <Menu />
          </button>
          {menuActive && (
            <>
              <div
                className="overlay"
                onClick={() => setMenuActive(false)}
              ></div>
              <div className="dropdown">
                <button
                  onClick={() => {
                    dispatch(changeActiveModal("editBoard"));
                    setMenuActive(false);
                  }}
                >
                  Edit Board
                </button>
                <button
                  onClick={() => {
                    dispatch(changeActiveModal("deleteBoard"));
                    setMenuActive(false);
                  }}
                >
                  Delete Board
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
