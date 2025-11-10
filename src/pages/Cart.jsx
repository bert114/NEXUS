import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import trashIcon from "../assets/icons/trash.svg";
import plusIcon from "../assets/icons/plus.svg";
import minusIcon from "../assets/icons/minus.svg";

import {
  getDataLocalStorage,
  handleToast,
  test,
  waitLoading,
} from "../helper/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSubtract } from "@fortawesome/free-solid-svg-icons";
import DeleteComponent from "../components/DeleteComponent";
import { data, useNavigate } from "react-router-dom";
import Confirmation from "../components/Confirmation";
import Confirm from "../components/Confirm";
import Empty from "../components/Empty";
import Load from "../components/Load";
import LoadingWrapper from "../components/LoadingWrapper";

function Cart() {
  const [modalMessage, SetModalMessage] = useState({});

  const objText = {
    Proceed: {
      message: "Proceed with this action?",
      subMessage: "Please confirm to continue.",
      btnAction: "Proceed",
      class: "pending",
    },
    Delete: {
      message: "Delete this item?",
      subMessage: "This action cannot be undone.",
      btnAction: "Delete",
      class: "error",
    },
  };

  const [carts, setCarts] = useState(
    JSON.parse(localStorage.getItem("cartExplore")) || []
  );
  const [selectCarts, setSelectedCart] =
    useState(localStorage.getItem("selectedCart")) || [];

  const orderDefault = () => {
    const newOrder = carts?.sort((a, b) => b.date - a.date);

    return newOrder;
  };

  const goTo = useNavigate();

  let [priceToPay, SetPriceToPay] = useState(0);

  let [cart, setCart] = useState(0);
  const [numItems, setNumItems] = useState(0);
  let [testCart, setTestCart] = useState([]);

  let [confirm, setConfirm] = useState(null);
  let [confirmCheckout, setConfirmCheckout] = useState(null);
  let [cartStorage, setCartStorage] = useState([]);
  const [loading, setLoading] = useState(false);

  let start = 0;

  useEffect(() => {
    let sortDate = orderDefault();
    const selectedTotal = carts
      .filter((cart) => cart.selected)
      .reduce((sum, cart) => sum + parseFloat(cart.total), 0);

    const selectedCart = carts.filter((cart) => cart.selected);
    const gadgetCount = selectedCart.length;

    SetPriceToPay(selectedTotal);
    setCart(sortDate);
    setNumItems(gadgetCount);

    console.log(gadgetCount);
  }, [carts]);

  const handleQuantity = async (e) => {
    e.stopPropagation();

    const card = e.target.closest(".card-cart");
    const cardId = Number(card.getAttribute("id"));
    const currentCard = carts.find((cart) => cart.id == cardId);
    //    const total =   * currentCount;

    let currentCount = currentCard.count;

    const decreaseBtn = e.target.closest("button");
    const addBtn = e.target.closest("button");

    if (addBtn.classList.contains("decrease")) {
      if (currentCount <= 1) {
        console.log("dondijidj");
        return;
      }
    }

    if (addBtn.classList.contains("add")) {
      if (currentCount >= 10) {
        console.log("dont ass");

        return;
      }
    }

    currentCard.originalPrice = currentCard.price;
    setTestCart(currentCard);

    //itemPrice,quantity
    let itemPrice = currentCard.price;
    let resultDisplay;
    let newCount = currentCard.count;
    let newTotal = currentCard.price;

    if (addBtn.classList.contains("add")) {
      newCount = currentCard.count + 1;
    } else {
      newCount = currentCard.count - 1;
    }

    newTotal = itemPrice * newCount;

    setCarts((prevCarts) => {
      const updateState = prevCarts.map((cart) =>
        cart.id === currentCard.id
          ? {
              ...cart,
              count: newCount,
              total: newTotal,
              dateAdded: Date.now(),
              test: "uhuhs",
            }
          : cart
      );

      localStorage.setItem("cartExplore", JSON.stringify(updateState));

      return updateState;
    });
  };

  const selectCart = (e) => {
    let totalOrders = 0;

    const target = e.target;
    const elem = target.closest(".card-cart");
    const elemId = elem.getAttribute("data-id");

    const cart = carts.find((cart) => cart.id === elemId);
    const total = parseFloat(cart.total);
    const price = parseFloat(cart.price);

    elem.classList.toggle("active");

    console.log(cart);

    const isActive = elem.classList.contains("active");

    setCarts((prev) => {
      const cartArray = prev.map((cart) => {
        if (cart.id === elemId) {
          return { ...cart, selected: isActive };
        } else {
          return cart;
        }
      });

      localStorage.setItem("cartExplore", JSON.stringify(cartArray));
      return cartArray;
    });

    let isSelected = false;

    //check active
    if (elem.classList.contains("active")) {
      totalOrders += total;
      isSelected = true;
    } else {
      totalOrders -= total;
      isSelected = false;
    }

    priceToPay += totalOrders;

    SetPriceToPay(priceToPay);

    return;

    // console.log(`Total: ${totalOrders}`);

    const id = elem.getAttribute("id");

    const clickCard = carts.map((cart) => {
      if (cart.id === id) {
        return { ...cart, selected: isSelected };
      } else {
        return cart;
      }
    });

    setCarts((prevCart) => {
      const clickedSelected = prevCart.map((cart) => {
        if (cart.id === id) {
          return { ...cart, selected: isSelected };
        } else {
          return cart;
        }
      });

      localStorage.setItem("cart", JSON.stringify(clickedSelected));

      return clickedSelected;
    });

    const totalPrice = carts.reduce((sum, cart) => {
      return cart.selected ? sum + cart.total : sum;
    }, 0);

    console.log(totalPrice);

    SetPriceToPay(totalPrice);

    carts.forEach((cart) => {
      if (cart.selected && cart.id === id) {
        //console.log(cart);
      }
    });
  };

  useEffect(() => {
    const total = carts.reduce((sum, cart) => {
      return cart.selected ? sum + cart.total : sum;
    }, 0);

    //SetPriceToPay(total);
  }, [carts]);

  let handleCheckout = async (e) => {
    setLoading(true);

    if (numItems == 0) {
      console.log("SELECT A GADGET");

      alert("Select a Gadget");
      setLoading(false);
      return;
    }

    //modalConfirm(".confirm-order", "initial");

    if (priceToPay == 0) {
      console.log("SELECT A GADGET");

      return;
    }

    const isCart = carts.filter((cart) => cart.selected == true);

    localStorage.setItem("overallPrice", JSON.stringify(priceToPay));
    localStorage.setItem("cartSelected", JSON.stringify(isCart));

    await waitLoading(setLoading, false, 2000);
    localStorage.setItem("visited", "checkout");
    goTo("/checkout");
  };

  const modalConfirm = (elem, visibility) => {
    document.querySelector(elem).style.visibility = visibility;
  };

  useEffect(() => {
    console.log(modalMessage.id);

    const deleteCart = carts.filter((cart) => cart.id !== modalMessage.id);

    if (!confirm) {
      setConfirm(null);
      return;
    }

    setCarts((prev) => {
      const deleteMe = prev.filter((c) => c.id !== modalMessage.id);

      console.log(deleteMe);

      localStorage.setItem("cartExplore", JSON.stringify(deleteMe));
      return deleteMe;
    });

    setConfirm(null);

    return;
    if (confirm) {
      setCarts(cartStorage);

      localStorage.setItem("cart", JSON.stringify(cartStorage));
    }
  }, [confirm]);

  useEffect(() => {
    //fix this
    return;
    if (!confirmCheckout) {
      modalConfirm(".confirm-order", "hidden");
      setConfirmCheckout(null);
      return;
    }

    goTo("/checkout");
  }, [confirmCheckout]);

  const displayModal = (elem, visible) => {
    document.querySelector(elem).style.visibility = visible;
  };

  const deleteGadget = (e) => {
    e.stopPropagation();

    displayModal(".modal-wrapper", "initial");
    //SetModalMessage(objText.Delete);

    console.log(modalConfirm);

    const elem = e.target;
    const id = elem.getAttribute("data-id");

    console.log(id);
    SetModalMessage((prev) => {
      return { ...objText["Delete"], id: id };
    });

    console.log(modalMessage);

    return;
    setCarts((prev) => {
      console.log(prev);
      const deleted = prev?.filter((cart) => cart.id !== id);

      localStorage.setItem("cartExplore", JSON.stringify(deleted));
      return deleted;
    });

    return;

    const cartId = e.target.closest(".card-cart").getAttribute("id");

    const deleted = carts.filter((cart) => {
      if (cart.id !== cartId) {
        return cart;
      }
    });

    setCartStorage(deleted);
    document.querySelector(".del-wrapper").classList.remove("hide");
  };

  return (
    <>
      <div className="cart-relative">
        <Navigation add={[]} setCarts={setCart} carts={carts} />

        <div className="cart">
          <h2>Cart</h2>
          {carts.length != 0 ? (
            <div className="cart-checkout-container">
              <div className="cart-container">
                {carts.map(
                  (
                    {
                      name,
                      id,
                      count,
                      total,
                      price,
                      originalPrice,
                      colorImages,
                      availableColors,
                      selected,
                      brand,
                      model,
                    },
                    i
                  ) => (
                    <div
                      className={`card-cart ${selected ? "active" : ""}`}
                      key={i}
                      id={id}
                      data-id={id}
                      onClick={(e) => selectCart(e)}
                    >
                      <div className="box1">
                        <div className="img-container">
                          <img src={colorImages[availableColors[0]]} alt="" />
                        </div>
                        <div className="box-info">
                          <div className="small-info">
                            <h3>{name}</h3>
                            <ul>
                              <li className="brand">{brand}</li>
                            </ul>
                          </div>
                          <div className="total">
                            $ <span>{Math.floor(total)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="box2">
                        <button
                          className="btn btn-delete"
                          onClick={(e) => deleteGadget(e)}
                          data-id={id}
                        >
                          <img src={trashIcon} alt="" data-id={id} />
                        </button>
                        <div className="quantity">
                          <button className="add" onClick={handleQuantity}>
                            <FontAwesomeIcon icon={faAdd} />
                          </button>
                          <div>
                            <span>{count}</span>
                          </div>
                          <button className="decrease" onClick={handleQuantity}>
                            <FontAwesomeIcon icon={faSubtract} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="test-box"></div>

              <section>
                <div className="checkout">
                  <h3>Order Summary</h3>

                  <div className="dynamic-result">
                    <ul>
                      <li>
                        <div>Items </div>
                        <h4>{numItems}</h4>
                      </li>
                      <li>
                        <div>Shipping (5-7 Days)</div>
                        <h4>Free</h4>
                      </li>
                      <li>
                        <div>Coupon Discount</div>
                        <h4>$0</h4>
                      </li>
                    </ul>

                    <div className="total">
                      <div>Total</div>
                      <h3>${priceToPay}</h3>
                    </div>
                  </div>

                  <button
                    className="btn-primary"
                    onClick={(e) => handleCheckout(e)}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </section>
            </div>
          ) : (
            <Empty />
          )}
        </div>
        {/* <DeleteComponent setConfirm={setConfirm} confirm={confirm} /> */}
        <DeleteComponent modalMessage={modalMessage} setConfirm={setConfirm} />
        {loading ? <LoadingWrapper /> : ""}
        {/* <Confirm setConfirmCheckout={setConfirmCheckout} /> */}
      </div>
    </>
  );
}

export default Cart;
