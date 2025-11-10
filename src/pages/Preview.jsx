import React, { useEffect } from "react";
import {
  getData,
  getDb,
  handleCartExplore,
  handleToast,
  test,
} from "../helper/util";
import { useState } from "react";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import Colors from "./Colors";
import { Card } from "react-bootstrap";
import Ratings from "../components/Ratings";
import cartIcon from "../assets/icons/cart-control.svg";
import Confirmation from "../components/Confirmation";
import heartIcon from "../assets/icons/heart.svg";
import ToastMessage from "../components/Toast";
import ToastNeww from "../components/ToastNeww";

function Preview() {
  const go = useNavigate("/cart");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", status: "" });
  const [load, setLoad] = useState(false);
  const [carts, setCarts] = useState(
    JSON.parse(localStorage.getItem("cartExplore")) || []
  );

  console.log(carts);
  const [selected, setItem] = useState(
    JSON.parse(localStorage.getItem("item"))
  );
  const [add, setAdd] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const gadget = JSON.parse(localStorage.getItem("card"));

  /*
  const addCart = async (e) => {
    const data = await handleCartExplore(e);

    const isExist = carts.find((cart) => cart.id === data.id);

    if (isExist) {
      console.log("cant be added");

      return;
    }

    const newData = [
      ...carts,
      { ...data, view: false, date: Date.now(), total: data.price, count: 1 },
    ];

    setCarts(newData);
    localStorage.setItem("cartExplore", JSON.stringify(newData));
  };
  */

  const handleCart = async () => {
    let isExist = add.find((current) => current.id === gadget.id);
    if (!gadget.inStock) {
      await handleToast(setToast, { message: "out of stock", status: "error" });

      return;
    }

    if (isExist) {
      console.log("item exist");
      await handleToast(setToast, {
        message: "Added already to cart",
        status: "error",
      });

      return;
    }

    setVisible(true);
  };

  const addCart = async (e) => {
    const data = await handleCartExplore(e);
    const isExist = carts.find((cart) => cart.id === data.id);

    if (load) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      return;
    }

    if (isExist) {
      showToast({ message: "already Exist", status: "error" });

      return;
    }

    showToast({ message: "add to cart", status: "success" });

    const newData = [
      ...carts,
      { ...data, view: false, date: Date.now(), total: data.price, count: 1 },
    ];

    setCarts(newData);
    localStorage.setItem("cartExplore", JSON.stringify(newData));
  };

  const {
    name,
    description,
    originalPrice,
    price,
    specs,
    rating,
    reviews,
    inStock,
  } = gadget;

  const img = gadget.colorImages[gadget.availableColors[0]];

  const specsKey = [];

  Object.entries(specs).forEach(([key, value]) => {
    specsKey.push(key);
  });

  const checkStatus = () => {
    return !inStock ? "Temporarily Unavailable" : "In Stock & Ready to Ship!";
  };

  const update = () => {
    console.log("usushushus");
  };

  const handleBuy = async (e) => {
    const data = await getDb();

    console.log(data);
    // check kung empty ang stock
    const id = e.target.getAttribute("data-id");
    if (!gadget.inStock) {
      return;
    }

    const filter = carts.filter((cart) => cart.selected);
    const find = data.find((cart) => cart.id === id);
    console.log(carts);

    console.log(find);

    localStorage.setItem("reserveCart", JSON.stringify(filter));
    localStorage.setItem("cartSelected", JSON.stringify([find]));

    console.log("Go to check out page");

    go("/checkout");
  };

  const showToast = async (obj) => {
    setLoad(true);

    const fixed = document.querySelector(".fixed");
    const toast = fixed.querySelector(".toastNew");

    setToast(obj);

    fixed.style.visibility = "initial";
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        toast.classList.add("show");
        resolve();
      }, 500);
    });

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    toast.classList.remove("show");
    fixed.style.visibility = "";
    setLoad(false);
  };

  return (
    <>
      <Navigation state="Explore" add={add} setCarts={setCarts} carts={carts} />
      {!loading ? (
        <main>
          <div className="container">
            {/* <h2>Preview page</h2> */}
            <div className="preview-container">
              <div className="img-container">
                <div className="img-wrapper">
                  <img alt="" src={img} />
                  <div className="heart-icon">
                    <img src={heartIcon} alt="" />
                  </div>
                </div>
              </div>
              <section>
                <div className="main">
                  <h2>{name}</h2>
                  <Ratings rating={rating} />
                </div>
                <p>{description}</p>

                <section>
                  <h3>Specs</h3>
                  <ul className="specs">
                    {specsKey.map((spa) => (
                      <li key={spa}>
                        <h3>{spa}:</h3>
                        <span>{gadget.specs[spa]}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="last-section">
                  <div className="stats">
                    <h3>$ {originalPrice || price}</h3>
                    <div>{checkStatus()}</div>
                  </div>
                  <div className="btn-wrapper">
                    <button
                      className="primary-btn"
                      onClick={(e) => handleBuy(e)}
                      data-id={gadget.id}
                    >
                      BUY NOW
                    </button>
                    <button
                      className="btn btn-primary"
                      data-id={gadget.id}
                      onClick={(e) => addCart(e)}
                    >
                      <img src={cartIcon} alt="" data-id={gadget.id} />
                      ADD TO CART
                    </button>
                  </div>
                </section>
              </section>
            </div>
          </div>

          <Confirmation
            setVisible={setVisible}
            visible={visible}
            gadget={gadget}
            setAdd={setAdd}
            setLoading={setLoading}
            setToast={setToast}
            toast={toast}
          />
          <ToastNeww toast={toast} />
        </main>
      ) : (
        <h1>loading</h1>
      )}
    </>
  );
}

export default Preview;
