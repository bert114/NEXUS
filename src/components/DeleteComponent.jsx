import {
  faForward,
  faProcedures,
  faTrash,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

function DeleteComponent({ modalMessage, setConfirm }) {
  const handleModal = (bool) => {
    document.querySelector(".modal-wrapper").style.visibility = "";
    setConfirm(bool);
  };

  let modalMessages = {
    message: "Proceed with this action?",
    subMessage: "Please confirm to continue.",
    btnAction: "Proceed",
  };

  return (
    <div className={`modal-wrapper hide`}>
      <div className="modal-dynamic">
        <div className="box">
          <FontAwesomeIcon
            icon={modalMessage.btnAction === "Delete" ? faTrash : faForward}
            className={modalMessage.btnAction}
          />
        </div>
        <h2>{modalMessage.message}</h2>
        <p>{modalMessage.subMessage}</p>

        <div className="btn-wrapper">
          <button className="btn" onClick={() => handleModal(false)}>
            Cancel
          </button>
          <button
            className={`btn ${modalMessage.class}`}
            onClick={() => handleModal(true)}
          >
            {modalMessage.btnAction}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteComponent;
