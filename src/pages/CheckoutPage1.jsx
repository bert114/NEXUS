import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBank,
  faCartShopping,
  faCheckCircle,
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
import Step1 from "../components/Step1";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Step2 from "../components/Step2";
import Step3Review from "../components/Step3Review";
import Confirmation from "../components/Confirmation";
import PurchaseReceipt from "../components/PurchaseReceipt";
import ConfirmOrder from "../components/ConfirmOrder";
import DeleteComponent from "../components/DeleteComponent";
import { useEffect } from "react";

function CheckoutPage1() {
  const [step, setStep] = useState(1);
  const [carts, setCarts] = useState(
    JSON.parse(localStorage.getItem("cartExplore")) || []
  );

  const [confirm, setConfirm] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userCheckout")) || {}
  );

  const [payment, setPayment] = useState({});

  const [modalMessage, setModalMessage] = useState({});

  const renderElem = () => {
    console.log(step);

    switch (step) {
      case 1:
        return <Step1 setStep={setStep} />;
      case 2:
        return (
          <Step2
            setStep={setStep}
            setConfirm={setConfirm}
            setModalMessage={setModalMessage}
            setPayment={setPayment}
          />
        );
      case "confirm":
        return (
          <Step2
            setStep={setStep}
            setConfirm={setConfirm}
            setModalMessage={setModalMessage}
            setPayment={setPayment}
          />
        );
      case 3:
        return <Step3Review setStep={setStep} />;
      case "done":
        return <Step3Review setStep={setStep} />;
      // case 3:

      //   return <Step3Review setStep={setStep} />;
      // case 4:
      //   return <Step3Review setStep={setStep} />;
      // case 5:
      //   return <Step3Review setStep={setStep} />;
    }
  };

  const renderModal = () => {
    const elem = document.querySelector(".modal-wrapper");

    // console.log(elem);
    switch (step) {
      case "confirm":
        // return <ConfirmOrder setStep={setStep} />;
        return (
          <DeleteComponent
            modalMessage={modalMessage}
            setModalMessage={setModalMessage}
            setConfirm={setConfirm}
          />
        );

      case "done":
        return <PurchaseReceipt setStep={setStep} />;
    }
  };

  useEffect(() => {
    console.log(step);

    if (step === "confirm") {
      document.querySelector(".modal-wrapper").style.visibility = "initial";
    }
  }, [step]);

  useEffect(() => {
    console.log(confirm);
    if (confirm) {
      setStep(3);

      setUser((prev) => {
        const newUserPayment = {
          ...prev,
          payMethod: "Credit Card",
          paymentDate: new Date().toLocaleDateString(),
          paymentTime: new Date().toLocaleTimeString(),
          /*
          cardNumber: payment["card-number"],
          cardExpire: payment["card-expiry"],
          cardName: payment["card-name"],
          */
        };

        Object.keys(payment).forEach((key) => {
          newUserPayment[key] = payment[key];
        });

        localStorage.setItem("userCheckout", JSON.stringify(newUserPayment));
        return newUserPayment;
      });

      setConfirm(null);
      return;
    }

    console.log(user);

    if (confirm === false) {
      setStep(2);
      setConfirm(null);
      return;
    }
  }, [confirm]);

  return (
    <>
      <Navigation carts={carts} setCarts={setCarts} />
      <main>
        <div className="checkout">
          <div className="checkout-container">
            <div className={`progress step${step}`}>
              <ul>
                <li className="box">
                  <div>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <h3>SHIPPING & ADDRESS</h3>
                </li>
                <li>
                  <div></div>
                </li>
                <li className="box">
                  <div>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <h3>PAYMENT</h3>
                </li>

                <li>
                  <div></div>
                </li>

                <li className="box">
                  <div>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <h3>REVIEW</h3>
                </li>
                <li>
                  <div></div>
                </li>
              </ul>
            </div>
            {renderElem()}
          </div>
          {renderModal()}
        </div>
      </main>
    </>
  );
}

export default CheckoutPage1;
