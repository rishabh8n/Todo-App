import React, { useState } from "react";
import "./styles.css";
import { Sun, Moon, Eye, EyeSlash, Board } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveBoard,
  changeActiveBoard,
} from "../../features/activeBoardSlice";

function Sidebar({ setTheme }) {
  const [hide, setHide] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const activeBoard = useSelector(selectActiveBoard);
  const boards = useSelector((state) => state.todo.boards);
  const dispatch = useDispatch();
  console.log(boards);
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
                  activeBoard === index ? "active" : ""
                }`}
                key={index}
                onClick={() => dispatch(changeActiveBoard(index))}
              >
                <Board />
                <span>{board.name}</span>
              </button>
            );
          })}
          <button className="addBoard">+Create New Board</button>
        </div>
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
        {/* <div className="boards">
        <p className="boards-count">ALL BOARDS(5)</p>
        <button className="board-name active">
          <span>Platform Launch</span>
        </button>
        <button className="board-name">
          <span>Marketing Plan</span>
        </button>
        <button className="board-name">
          <span>Roadmap</span>
        </button>
        <button className="addBoard">+Create New Board</button>
      </div>
      <div className="day-night">
        <LightModeIcon />

        <button
          className={nightMode ? "on" : "off"}
          onClick={() => setNightMode((prev) => !prev)}
        >
          <div></div>
        </button>
        <DarkModeIcon />
      </div> */}
      </div>
    </>
  );
}

export default Sidebar;
