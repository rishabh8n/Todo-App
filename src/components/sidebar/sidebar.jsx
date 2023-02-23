import React, { useState } from "react";
import "./styles.css";
import { Sun, Moon, Eye, EyeSlash, Board } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveBoardId,
  changeActiveBoardId,
} from "../../features/activeBoardSlice";
import {
  changeActiveModal,
  changeModalStatus,
} from "../../features/modalsSlice";

function Sidebar({ setTheme }) {
  const [hide, setHide] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const activeBoardId = useSelector(selectActiveBoardId);
  const boards = useSelector((state) => state.todo.boards);
  const dispatch = useDispatch();
  return (
    <>
      <div className="hide-btn">
        <button
          className={hide ? "hidden" : "shown"}
          onClick={() => setHide((prev) => !prev)}
        >
          <span className="hide">
            <EyeSlash />
            Hide Sidebar
          </span>
          <span className="show">
            <Eye />
            Show Sidebar
          </span>
        </button>
      </div>
      <div className={`sidebar ${hide ? "hidden" : ""}`}>
        <div className="logo">
          <div className="logo-art">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1 className="logo-name">kanban</h1>
        </div>
        <div className="boards">
          <p className="boards-count">ALL BOARDS({boards.length})</p>
          {boards.map((board, index) => {
            return (
              <button
                className={`board-name ${
                  activeBoardId === board.id ? "active" : ""
                }`}
                key={board.id}
                onClick={() => dispatch(changeActiveBoardId(board.id))}
              >
                <Board />
                <span>{board.name}</span>
              </button>
            );
          })}
        </div>
        <button
          className="addBoard"
          onClick={() => {
            dispatch(changeActiveModal({ name: "addBoard" }));
          }}
        >
          +Create New Board
        </button>
        <div className="theme">
          <Sun />

          <button
            className={darkMode ? "on" : "off"}
            onClick={() => {
              setDarkMode((prev) => {
                setTheme(!prev ? "dark" : "light");
                return !prev;
              });
            }}
          >
            <div></div>
          </button>
          <Moon />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
