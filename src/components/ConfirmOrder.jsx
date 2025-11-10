import React from "react";

function ConfirmOrder({ setStep }) {
  const handleConfirm = (e) => {
    const body = document.querySelector("button");
    const attribute = e.target.getAttribute("data-btn");
    const bool = attribute === "true" ? true : false;
    console.log(bool);

    bool ? setStep(3) : setStep(2);
  };

  return (
    <div className="confirm-order">
      <div className=" grid-container">
        <div className="box">
          <div className="btn-wrapper">
            <h2>Confirm?</h2>
            <button
              className="btn-primary btn"
              data-btn="true"
              onClick={(e) => handleConfirm(e)}
            >
              confirm
            </button>
            <button
              className="btn-secondary btn"
              data-btn="false"
              onClick={(e) => handleConfirm(e)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
