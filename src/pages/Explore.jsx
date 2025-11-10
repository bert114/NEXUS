import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import {
  displayData,
  getColors,
  getData,
  getDate,
  getDb,
  handleCartExplore,
  listOfGadget,
  saveCart,
  setNotificationCount,
  test,
} from "../helper/util";
import Colors from "./Colors";

import heart from "../assets/icons/heart.svg";
import Search from "../components/Search";
import Skeleton from "../components/Skeloton";
import NoProduct from "../components/NoProduct";
import cart from "../assets/icons/cart-control.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import ToastNeww from "../components/ToastNeww";

function Explore() {
  const [gadgets, setGadget] = useState([]);
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(true);
  const navigate = useNavigate();
  const [carts, setCarts] = useState(
    JSON.parse(localStorage.getItem("cartExplore")) || []
  );
  const [count, setCount] = useState(0);
  const [toast, setToast] = useState({});
  const [load, setLoad] = useState(false);

  /*
  useEffect(() => {
    const getFile = async () => {
      try {
        let data = await fetch("/PENANSESCALZOZO.json");
        let res = await data.json();

        let person = [];

        setGadget(res);

        setTimeout(() => {
          setLoading(false);
        }, 1000);

        res.forEach((t) => {
          // console.log(t.availableColors[0]);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getFile();
  }, []);
  */

  useEffect(() => {
    displayData(setGadget);
  }, []);

  const handleClick = async (e) => {
    if (load) {
      e.stopImmediatePropagation();
      return;
    }

    if (e.target.matches("button")) {
      return;
    }

    const elem = e.target.closest(".card");

    let id = elem.getAttribute("id");

    const filter = gadgets.find((card) => card.id == id);

    localStorage.setItem("card", JSON.stringify(filter));

    navigate("/preview");
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

  const addCart = async (e) => {
    e.stopPropagation();

    const data = await handleCartExplore(e);
    const isExist = carts.find((cart) => cart.id === data.id);

    if (load) {
      e.stopImmediatePropagation();
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

  return (
    <>
      <Navigation carts={carts} setCarts={setCarts} />

      <div className="explore-wrapper">
        <h2>LIST OF GADGETS</h2>
        <Search
          setGadget={setGadget}
          gadget={gadgets}
          setLoading={setLoading}
          setFound={setFound}
        />
        <div className="explore container">
          {!found ? (
            <NoProduct />
          ) : (
            <div className="cards-container">
              {gadgets.map((g) => {
                const defaultClr = g.availableColors[0];
                const defImg = g.colorImages[defaultClr];
                const { name, price, img, description } = g;

                return (
                  <div
                    className={`card box ${!loading ? "" : "loading"}`}
                    key={g.id}
                    id={g.id}
                    onClick={handleClick}
                  >
                    <div className="img-wrapper">
                      <img src={defImg} />
                      <div className="icon">
                        <button>
                          <img src={heart} alt="" />
                        </button>
                      </div>
                    </div>
                    <div className="info">
                      <h3>{name}</h3>
                      <p>{description.slice(0, 90)}...</p>
                      <div className="bottom">
                        <div className="details">
                          <div>
                            <span>PRICE</span>
                            <div className="price">${price}</div>
                          </div>
                          <button
                            className="cart-btn-primary"
                            onClick={(e) => addCart(e)}
                            data-id={g.id}
                          >
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <div>Add to Cart</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* {gadget.map((g, i) => {
                const defaultClr = g.availableColors[0];
                const defImg = g.colorImages[defaultClr];
                const { name, price, img, description } = g;

                return loading ? (
                  <div
                    className="card box loading"
                    key={g.id}
                    id={g.id}
                    onClick={handleClick}
                  >
                    <div className="img-wrapper">
                      <img src={defImg} />
                      <div className="icon">
                        <button>
                          <img src={heart} alt="" />
                        </button>
                      </div>
                    </div>
                    <div className="info">
                      <h3>{name}</h3>
                      <p>{description.slice(0, 90)}...</p>
                      <div className="bottom">
                        <div className="details">
                          <div>
                            <span>PRICE</span>
                            <div className="price">${price}</div>
                          </div>
                          <button>
                            <img src={cart} alt="" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Skeleton key={g.id} />
                );
              })} */}
            </div>
          )}
        </div>
        <ToastNeww toast={toast} />
      </div>
    </>
  );
}

export default Explore;
