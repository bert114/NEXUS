import { Toast } from "bootstrap/dist/js/bootstrap.bundle";
import React, { useState } from "react";
import { colors, handleToast, test } from "../helper/util";

function Confirmation({
  gadget,
  setAdd,
  visible,
  setVisible,
  setToast,
  toast,
}) {
  // when showing ig disable ang scroll
  let count = 0;
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const carts = JSON.parse(localStorage.getItem("cart")) || [];

  const handleCart = async (e) => {
    const body = document.querySelector("body");
    const state = e.target.getAttribute("data-state");
    if (loading) {
      return;
    }

    // console.log(isExist);

    if (state === "continue") {
      setLoading(true);

      gadget.count = 1;
      gadget.addedAt = new Date().toISOString();
      gadget.total = Math.floor(gadget.price);

      carts.push(gadget);

      localStorage.setItem("cart", JSON.stringify(carts));

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });

      setLoading(false);
      setAdd(carts);
      setVisible(false);

      handleToast(setToast, {
        message: "Successfully add gadget",
        status: "success",
      });
    } else {
      setVisible(false);
    }

    /*
    if () {
      
    }
    */

    return;
    toastElem.classList.add("in");
    toastElem.style.opacity = 1;

    await new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    });

    toastElem.classList.add("out");

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        toastElem.classList.remove("in");
        toastElem.classList.remove("out");

        resolve();
      }, 2000);
    });

    //toastElem.style.opacity = 1;

    /*
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        toastElem.style.transform = "translateX(40rem)";
        resolve();
      }, 3000);
    });

    */

    //toastElem.classList.remove("active");
    // toastElem.style.opacity = 0;
  };

  return (
    <>
      {!loading ? (
        <div className={`modal-confirmation ${visible ? "active" : ""}`}>
          <div className="confirm-container">
            <div className="confirm-wrapper">
              <h1>Confirm</h1>
              <div className="btn-wrapper">
                <button data-state="continue" onClick={handleCart}>
                  ok
                </button>
                <button data-state="cancel" onClick={handleCart}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`modal-confirmation ${visible ? "active" : ""}`}>
          <div className="confirm-container">
            <div className="confirm-wrapper">
              <h1>Loading.........</h1>
              <div className="btn-wrapper">
                <button data-state="continue" onClick={handleCart}>
                  ok
                </button>
                <button data-state="cancel" onClick={handleCart}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Confirmation;
