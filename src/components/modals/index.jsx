import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeModalStatus,
  selectActiveModal,
} from "../../features/modalsSlice";
import AddBoard from "./addBoard";
import AddTask from "./addTask";
import DeleteBoard from "./deleteBoard";
import DeleteTask from "./deleteTask";
import EditBoard from "./editBoard";
import "./styles.css";
import ViewTask from "./viewTask";

function Modal() {
  const modal = useSelector(selectActiveModal);
  const disptach = useDispatch();
  const getModal = () => {
    if (modal.modalName === "addBoard") {
      return <AddBoard />;
    }
    if (modal.modalName === "deleteBoard") {
      return <DeleteBoard />;
    }
    if (modal.modalName === "editBoard") {
      return <EditBoard />;
    }
    if (modal.modalName === "addTask") {
      return <AddTask />;
    }
    if (modal.modalName === "viewTask") {
      return <ViewTask taskId={modal.taskId} />;
    }
    if (modal.modalName === "deleteTask") {
      return <DeleteTask taskId={modal.taskId} />;
    }
  };
  return (
    <>
      {modal.active && (
        <div
          className="modal-overlay"
          onClick={() => disptach(changeModalStatus(false))}
        >
          {getModal()}
        </div>
      )}
    </>
  );
}

export default Modal;
