import React from "react";

function CodPayment({ setStep, setConfirm, setModalMessage, elem }) {
  const handleCod = () => {
    //document.querySelector(modal).style.visibility = "initial";
    console.log("show modal confirm");

    //setConfirm(true);
    //this

    setModalMessage({
      message: "Proceed with this action?",
      subMessage: "Please confirm to continue.",
      btnAction: "Proceed",
      class: "pending",
    });

    setStep("confirm");
    return;
  };

  return (
    <>
      <div>CodPayment</div>
      <button className="btn btn-primary" onClick={() => handleCod()}>
        Continue
      </button>
    </>
  );
}

export default CodPayment;
