import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CardPayment from "./CardPayment";
import ExpressPayment from "./ExpressPayment";
import CodPayment from "./CodPayment";
import { getCartSelected, getDate } from "../helper/util";

function Step2({ setStep, setConfirm, setModalMessage, elem, setPayment }) {
  let day = new Date();
  let overallPrice = JSON.parse(localStorage.getItem("overallPrice"));
  const gadget = JSON.parse(localStorage.getItem("cartSelected")) || [];
  let numberOfGadget = getCartSelected();
  const test = () => {
    let payment = JSON.parse(localStorage.getItem("paymentMethod"));

    switch (payment) {
      case "cod":
        return (
          <CodPayment
            setStep={setStep}
            setConfirm={setConfirm}
            setModalMessage={setModalMessage}
            elem={elem}
            setPayment={setPayment}
          />
        );
      case "express":
        return (
          <CardPayment
            setStep={setStep}
            setConfirm={setConfirm}
            setModalMessage={setModalMessage}
            elem={elem}
            setPayment={setPayment}
          />
        );

        return (
          <ExpressPayment
            setStep={setStep}
            setConfirm={setConfirm}
            setModalMessage={setModalMessage}
            elem={elem}
            setPayment={setPayment}
          />
        );
      case "card":
        return (
          <CardPayment
            setStep={setStep}
            setConfirm={setConfirm}
            setModalMessage={setModalMessage}
            elem={elem}
            setPayment={setPayment}
          />
        );

      default:
        break;
    }
  };

  return (
    <>
      <div className="payment" onClick={test}>
        <section>
          <h2>PAYMENT</h2>

          {test()}
        </section>
        <div className="payment-stats">
          <h2>Order Summary</h2>
          <div className="summary-container">
            {gadget.map((g) => (
              <div className="info" key={g.id}>
                <div className="img-container">
                  <img src={g.colorImages[g.availableColors[0]]} alt="" />
                </div>
                <div className="price-flex flex">
                  <h3>{g.name}</h3>
                  <div>{g.price}</div>
                </div>
              </div>
            ))}
          </div>
          <ul className="items-payment-flex">
            <li>
              <h3>Number of Gadget</h3>
              <div>{numberOfGadget}</div>
            </li>
            <li className="total-price">
              <h3>Total</h3>
              <h3>${overallPrice}</h3>
            </li>
          </ul>
          <div className="date-info">
            <div>{getDate("day")}</div>
            <div>{getDate("full date")} | 11:00AM</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Step2;
