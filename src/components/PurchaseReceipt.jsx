import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getCartSelected, getTotalCheckOut } from "../helper/util";

function PurchaseReceipt({ setStep }) {
  const NumItems = getCartSelected();
  const total = `$${getTotalCheckOut()}`;
  const status = "Processing";
  const goTo = useNavigate();

  return (
    <div className="purchase-receipt hide">
      <div className="grid">
        <div className="box receipt">
          <h2>Order Successful!</h2>
          <p>Thank you for your purchase! Order #: ORD-12345-678</p>
          <p>
            A confirmation email has been sent to: janpenans@gmail.com Estimated
            Delivery: Nov 16,2025
          </p>

          <div className="box">
            <h3>Order Summary</h3>
            <ul>
              <li>
                <div>Items</div>
                {/* change Items,total,status */}
                <div>{NumItems}</div>
              </li>
              <li>
                <div>Total</div>
                {/* change Items,total,status */}
                <div>{total}</div>
              </li>
              <li>
                <div>Status</div>
                {/* change Items,total,status */}
                <div>{status}</div>
              </li>
            </ul>
          </div>
          <div className="btn-wrapper">
            <button
              className="btn-primary btn"
              onClick={() => goTo("/explore")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseReceipt;
