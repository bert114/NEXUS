import {
  faCheckCircle,
  faClose,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import("../scss/toast.scss");

function ToastNeww({ toast }) {
  const renderIcon = () => {
    switch (toast.status) {
      case "error":
        return <FontAwesomeIcon icon={faWarning} />;
      case "success":
        return <FontAwesomeIcon icon={faCheckCircle} />;
      case "error":
        return <FontAwesomeIcon icon={faWarning} />;

      default:
        break;
    }
  };

  return (
    <div className="fixed">
      <div className="toast-container">
        <div className={`toastNew error flex ${toast.status}`}>
          <div className="flex">
            <div className="toastNew__icon">{renderIcon()}</div>
            <div className="toastNew__title">{toast.message}</div>
          </div>
          <div className="toastNew__close">
            <FontAwesomeIcon icon={faClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastNeww;
