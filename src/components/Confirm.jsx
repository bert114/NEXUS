import React from "react";

function Confirm({ setConfirmCheckout }) {
  const handleConfirm = (e) => {
    setConfirmCheckout(true);
  };

  return (
    <div>
      <div className="confirm-order">
        <div className=" grid-container">
          <div className="box">
            <div className="btn-wrapper">
              <h2>Confirm?</h2>
              <button
                className="btn-primary btn"
                data-btn="true"
                onClick={(e) => setConfirmCheckout(true)}
              >
                confirm
              </button>
              <button
                className="btn-secondary btn"
                data-btn="false"
                onClick={(e) => setConfirmCheckout(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
