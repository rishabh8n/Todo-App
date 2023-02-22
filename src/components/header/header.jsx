import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "../../assets/icons";
import { selectActiveBoardId } from "../../features/activeBoardSlice";
import { changeActiveModal } from "../../features/modalsSlice";
import "./styles.css";

function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const activeBoardId = useSelector(selectActiveBoardId);
  const board = useSelector((state) =>
    state.todo.boards.find((board) =>
      board.id === activeBoardId ? true : false
    )
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className="header">
        {board && (
          <>
            <h1>{board.name}</h1>
            <button
              className="addTask-btn"
              onClick={() => dispatch(changeActiveModal({ name: "addTask" }))}
            >
              + Add New Task
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
