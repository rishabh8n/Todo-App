import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Board, Down, Menu, Moon, Sun } from "../../assets/icons";
import {
  changeActiveBoardId,
  selectActiveBoardId,
} from "../../features/activeBoardSlice";
import { changeActiveModal } from "../../features/modalsSlice";
import "./styles.css";

function Header({ setTheme }) {
  const [hide, setHide] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const activeBoardId = useSelector(selectActiveBoardId);
  const boards = useSelector((state) => state.todo.boards);
  const [menuActive, setMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const board = useSelector((state) =>
    state.todo.boards.find((board) =>
      board.id === activeBoardId ? true : false
    )
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className="header">
        <div className="logo">
          <div className="logo-art">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {board && (
          <>
            <h1>{board.name}</h1>
            <div className="mobile-drop-btn">
              <button onClick={() => setMobileMenuActive((prev) => !prev)}>
                <Down />
              </button>
            </div>
            {mobileMenuActive && (
              <>
                <div
                  className="mobile overlay"
                  onClick={() => setMobileMenuActive(false)}
                ></div>
                <div className="mobile-drop-menu">
                  <div className="boards">
                    <p className="boards-count">ALL BOARDS({boards.length})</p>
                    {boards.map((board, index) => {
                      return (
                        <button
                          className={`board-name ${
                            activeBoardId === board.id ? "active" : ""
                          }`}
                          key={board.id}
                          onClick={() =>
                            dispatch(changeActiveBoardId(board.id))
                          }
                        >
                          <Board />
                          <span>{board.name}</span>
                        </button>
                      );
                    })}
                    <button
                      className="addBoard"
                      onClick={() => {
                        dispatch(changeActiveModal({ name: "addBoard" }));
                        setMobileMenuActive(false);
                      }}
                    >
                      +Create New Board
                    </button>
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
                </div>
              </>
            )}
            <button
              className="addTask-btn"
              onClick={() => dispatch(changeActiveModal({ name: "addTask" }))}
            >
              + <span>Add New Task</span>
            </button>
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
                        dispatch(changeActiveModal({ name: "editBoard" }));
                        setMenuActive(false);
                      }}
                    >
                      Edit Board
                    </button>
                    <button
                      onClick={() => {
                        dispatch(changeActiveModal({ name: "deleteBoard" }));
                        setMenuActive(false);
                      }}
                    >
                      Delete Board
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
