import React from "react";
import "../scss/preview.scss";

function ToastMessage({ setToast, toast }) {
  //message: "", status:

  return (
    <>
      <div className="t-wrapper">
        <div className={`toast-container ${toast.status}`}>
          <div className="box">
            <div className="icon-state"></div>

            <div>{toast.message}</div>
          </div>
          <div className="close">close</div>
        </div>
      </div>
    </>
  );
}

export default ToastMessage;
