import React from "react";
import { useNavigate } from "react-router-dom";
import basket from "../assets/gif/basket.gif";
function Empty() {
  const goTo = useNavigate();

  return (
    <>
      <div className="empty-cart cart-container">
        <div className="box-empty">
          <div className="box">
            <img src={basket} alt="empty cart" />
            <h2>Your cart is empty!</h2>
            <p>looks like you haven't added anything to your cart yet</p>
            <button
              onClick={() => goTo("/explore")}
              className="btn btn-primary"
            >
              Go to Explore
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Empty;
