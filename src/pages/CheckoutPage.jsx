import React, { useState } from "react";
import Navigation from "../components/Navigation";
import "../scss/checkout.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheckToSlot,
  faCircle,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
function CheckoutPage() {
  const [carts, setCarts] = useState(
    JSON.parse(localStorage.getItem("cartExplore")) || []
  );

  return (
    <>
      <Navigation carts={carts} setCarts={setCarts} />
      <div className="checkout-wrapper">
        <div className="sticky">
          <div className="checkout-progress">
            <ul className="icons">
              <li>
                <div>
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
              </li>
              <li>
                <div>
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
              </li>
              <li>
                <div>
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
              </li>
              <li>
                <div>
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
              </li>
            </ul>
            <ul className="text">
              <li>
                <div>step1</div>
              </li>
              <li>
                <div>step1</div>
              </li>
              <li>
                <div>step1</div>
              </li>
              <li>
                <div>step1</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="main-container">
          <div className="flex-layout checkout">
            <section>
              <div className="shipping-info">
                <h2>Shipping</h2>
                <form>
                  <ul>
                    <li>
                      <input type="text" placeholder="First name" />
                    </li>
                    <li>
                      <input type="text" placeholder="Last name" />
                    </li>
                    <li>
                      <input type="text" placeholder="Address" />
                    </li>
                    <li>
                      <input type="text" placeholder="City" />
                    </li>
                  </ul>
                </form>
              </div>
              <div className="summary-cart form-box">
                <h2>Summary</h2>
                <ul className="flex-gadget">
                  <li>
                    <div className="info">
                      <div className="img-wrapper"></div>
                      <div className="description">
                        <h3>Lorem ipsum dolor sit.</h3>
                        Lorem.
                      </div>
                    </div>
                    <div>$129</div>
                  </li>
                </ul>

                <ul className="price-box">
                  <li>
                    <div>Original price</div>
                    <h3>$0509</h3>
                  </li>
                  <li>
                    <div>Original price</div>
                    <h3>$0509</h3>
                  </li>
                  <li>
                    <div>Original price</div>
                    <h3>$0509</h3>
                  </li>
                </ul>
                <ul>
                  <li>
                    <h3>Total</h3>

                    <h3>Price</h3>
                  </li>
                </ul>
              </div>
            </section>
            <section>Payment</section>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
