import { parse } from "@fortawesome/fontawesome-svg-core";
import React, { useState } from "react";
import OrderList from "./OrderList";
import Load from "./Load";

function Step3Review({ setStep }) {
  let user = JSON.parse(localStorage.getItem("userCheckout"));
  let overallPrice = JSON.parse(localStorage.getItem("overallPrice"));
  const [carts, setCarts] = useState(
    JSON.parse(localStorage.getItem("cartSelected")) || []
  );

  const [loading, setLoading] = useState(false);

  const [cartExplore, setCartsExplore] = useState(
    JSON.parse(localStorage.getItem("cartExplore")) || []
  );

  const handleConfirm = async () => {
    setLoading(true);
    setStep("done");

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        document.querySelector(".purchase-receipt").style.visibility =
          "initial";
        resolve();
      }, 1000);
    });

    setCartsExplore((prev) => {
      const purchase = prev?.map((carts) => {
        if (carts.selected) {
          return {
            ...carts,
            purchased: true,
            date: Date.now(),
            selected: false,
          };
        } else {
          return { ...carts };
        }
      });

      const remove = prev?.filter((cart) => cart.selected !== true);
      console.log(purchase);
      console.log(remove);

      localStorage.setItem("cartExplore", JSON.stringify(remove));
      localStorage.setItem("purchaseHistory", JSON.stringify(purchase));
      localStorage.setItem("cartSelected", JSON.stringify([]));

      return remove;
    });

    setLoading(false);
  };

  return (
    <div className="oder-review f-layout">
      <div className="review-items flex">
        <div className="shipping-info">
          <h2>Shipping summary</h2>
          <ul>
            <li>
              <h3>{`${user.fname} ${user.lname}`}</h3>
            </li>
            <li>
              <h3>{`${user.address}`} </h3>
            </li>
            <li>
              <h3>{`${user.city}`} </h3>
            </li>
            <li>
              <h3>123 Main Street </h3>
            </li>
          </ul>
        </div>
        <ul className="payment-info">
          <h2>Payment summary</h2>

          <li>Visa *****123</li>
          <li>Exp 12/25</li>
        </ul>
      </div>

      <div className="order-items">
        <h2>Order summary</h2>

        <OrderList setCarts={setCarts} carts={carts} />
        <ul className="order-summary">
          <li>
            Subtotal <span>{overallPrice}</span>
          </li>
          <li>
            Shipping fee <span>Free</span>
          </li>
          <li>
            Total <span>{overallPrice}</span>
          </li>
        </ul>
        <button
          className="btn-primary btn purchase-done"
          onClick={(e) => handleConfirm(e)}
        >
          {!loading ? "Confirm Order" : <Load />}{" "}
          {loading ? "Processing..." : ""}
        </button>
      </div>
    </div>
  );
}

export default Step3Review;
