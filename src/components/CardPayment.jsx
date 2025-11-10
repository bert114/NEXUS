import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { use } from "react";

function CardPayment({ setStep, setModalMessage, setPayment }) {
  const handleChange = (e) => {
    const property = e.target.getAttribute("data-name");
    console.log(property);

    setPayment((prev) => {
      return { ...prev, [property]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setModalMessage({
      message: "Proceed with this action?",
      subMessage: "Please confirm to continue.",
      btnAction: "Proceed",
      class: "pending",
    });

    setStep("confirm");
    console.log(e);
  };

  return (
    <>
      <div className="payment-bank">
        <div>
          <h3>Credit Card</h3>

          <ul className="flex flex-input">
            <li className="box card-number">
              <div className="dynamic">
                <label>Card Number</label>
                <div className="err-m"></div>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="1234 5678 9101"
                  onChange={(e) => handleChange(e)}
                  data-name="card-number"
                />
                <FontAwesomeIcon icon={faCreditCard} />
              </div>
            </li>
            <li className="box expiry-date">
              <div className="dynamic">
                <label>Expiry Date</label>
                <div className="err-m"></div>
              </div>
              <div className="input-box">
                <input
                  onChange={(e) => handleChange(e)}
                  type="date"
                  data-name="card-expiry"
                />
              </div>
            </li>

            <li className="box cardholder-name">
              <div className="dynamic">
                <label>Cardholder Name</label>
                <div className="err-m"></div>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  placeholder="albert"
                  data-name="card-name"
                />
              </div>
            </li>
          </ul>

          <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
            Pay now
          </button>
        </div>
      </div>
    </>
  );

  return;
  return (
    <div>
      <div className="card-box">
        <FontAwesomeIcon icon={faCreditCard} />
        <div>Credit Card</div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <ul>
          <li>
            <label>Name of Card</label>
            <div className="box">
              <input type="text" />
            </div>
          </li>
          <li>
            <label>Card Number</label>
            <div className="box">
              <input type="text" />
            </div>
          </li>
        </ul>

        <button className="btn btn-primary">Continue</button>
      </form>
    </div>
  );
}

export default CardPayment;
