import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import codIcon from "../assets/icons/cod.svg";
import expressIcon from "../assets/icons/rabbit.svg";
import bankingIcon from "../assets/icons/piggy-bank.svg";

import {
  faBank,
  faCartShopping,
  faCheckCircle,
  faCircle,
  faCity,
  faCode,
  faIdCard,
  faLocation,
  faMoneyBill,
  faMoneyBillAlt,
  faPerson,
  faUser,
  faUserAltSlash,
} from "@fortawesome/free-solid-svg-icons";

function Step1({ setStep }) {
  let error = 0;
  const [user, setUser] = useState({});
  const [btnSate, setBtnSate] = useState(false);
  const [isActive, setActive] = useState({
    cod: false,
    express: false,
    card: false,
  });
  // if success step 2

  const btnElem = (elem) => {
    const button = document.querySelector("button");

    const btn = document.querySelector(elem);

    if (!btnSate) {
      btn.classList.add("disable");
    } else {
      btn.classList.remove("disable");
    }

    console.log(btn);
  };

  const checkEmptyInputFields = () => {
    let error = 0;

    document.querySelectorAll("input").forEach((elem) => {
      if (elem.value === "") {
        console.log("enter");

        error++;
        return;
      }
    });

    return error;
  };

  const checkRadioBtn = () => {
    const keys = Object.keys(isActive).find(
      (value) => isActive[value] === true
    );

    if (keys === undefined) {
      return "error";
    }

    return keys;
  };

  const handleFirstStep = (e) => {
    checkRadioBtn();

    if (checkEmptyInputFields() > 0) {
      alert("enter all input to continue");

      return;
    }

    if (checkRadioBtn() === "error") {
      alert("select a payment method");
      return;
    }

    localStorage.setItem("paymentMethod", JSON.stringify(checkRadioBtn()));
    localStorage.setItem("userCheckout", JSON.stringify(user));
    setStep(2);

    console.log(checkRadioBtn());
  };

  const handleRadioPayment = (method) => {
    console.log(method);

    const forCod = () => {
      setActive((prev) => ({
        ...prev,
        cod: false,
        express: false,
        card: false,
        paymentMethod: checkRadioBtn(),
        [method]: true,
      }));
    };

    forCod();

    console.log(isActive);

    switch (method) {
      case "cod":
        break;

      case "express":
        break;

      case "card":
        break;

      default:
        break;
    }

    console.log(isActive);
  };

  const checkEmpty = (e) => {
    let inputError = 0;
    let inputProperty = e.target.getAttribute("name");
    console.log(inputProperty);

    setUser((prev) => ({
      ...prev,
      [inputProperty]: e.target.value,
    }));
  };

  return (
    <aside>
      <section className="shipping">
        <h2>Shipping</h2>
        <ul>
          <li>
            <label htmlFor="name">Name</label>
            <div className="box">
              <input type="text" name="fname" onChange={checkEmpty} />
              <FontAwesomeIcon icon={faUser} />
            </div>
          </li>
          <li>
            <label>Last name</label>
            <div className="box">
              <input type="text" name="lname" onChange={checkEmpty} />
              <FontAwesomeIcon icon={faUser} />
            </div>
          </li>
          <li>
            <label>Address</label>
            <div className="box">
              <input type="text" name="address" onChange={checkEmpty} />
              <FontAwesomeIcon icon={faLocation} />
            </div>
          </li>
          <li>
            <label>City</label>
            <div className="box">
              <input type="text" name="city" onChange={checkEmpty} />
              <FontAwesomeIcon icon={faCity} />
            </div>
          </li>
          <li>
            <label>Zip Code</label>
            <div className="box">
              <input type="number" inputMode="numeric" minLength={6} />

              <FontAwesomeIcon icon={faCode} />
            </div>
          </li>
        </ul>
      </section>
      <section className="payMethod">
        <h2>Payment Method</h2>
        <ul>
          <li
            onClick={() => handleRadioPayment("cod")}
            className={isActive.cod ? "active" : ""}
          >
            <div className="img-container">
              {/* <FontAwesomeIcon icon={faMoneyBillAlt} /> */}
              <img src={codIcon} alt="" />
            </div>
            <h3>Cash on Delivery</h3>
            <FontAwesomeIcon icon={isActive.cod ? faCheckCircle : faCircle} />
          </li>
          <li
            onClick={() => handleRadioPayment("express")}
            className={isActive.express ? "active" : ""}
          >
            <div className="img-container">
              <img src={expressIcon} alt="" />
            </div>
            <h3>Express Shipping - $10.00x</h3>
            <FontAwesomeIcon
              icon={isActive.express ? faCheckCircle : faCircle}
            />
          </li>

          <li
            onClick={() => handleRadioPayment("card")}
            className={isActive.card ? "active" : ""}
          >
            <div className="img-container">
              <img src={bankingIcon} alt="" />
            </div>
            <h3>Internet Banking</h3>
            <FontAwesomeIcon icon={isActive.card ? faCheckCircle : faCircle} />
          </li>
        </ul>

        <button
          className="btn btn-primary save-button"
          onClick={handleFirstStep}
        >
          Save & continue
        </button>
      </section>
    </aside>
  );
}

export default Step1;
