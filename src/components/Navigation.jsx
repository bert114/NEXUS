import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cart from "../assets/icons/cart.svg";
import wishlist from "../assets/icons/list-circle.svg";
import profile from "../assets/icons/person-circle.svg";
import logo from "../assets/landing/logo.png";
import "../scss/cart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faCircleUser,
  faClipboardList,
  faClose,
  faHamburger,
  faHome,
  faMap,
  faMarsAndVenus,
} from "@fortawesome/free-solid-svg-icons";
import { setNotificationCount } from "../helper/util";
import { faInternetExplorer } from "@fortawesome/free-brands-svg-icons";

function Navigation({ carts, setCarts }) {
  const goTo = useNavigate();

  const [visit, setVisit] = useState(null);
  const [menu, setMenu] = useState("close");

  //let current = state == "Home" ? "/" : "/explore";

  const [route, setRoute] = useState({ route: "explore" });
  const currentRoute = useState(
    JSON.parse(localStorage.getItem("currentR"))
  ) || { route: "explore" };

  const [routeShit, setRouteShit] = useState(
    JSON.parse(localStorage.getItem("currentTest")) || { route: "explore" }
  );

  useEffect(() => {
    if (visit === "checkout") return;

    const stateVisit = localStorage.getItem("visited");
    console.log(stateVisit);

    setVisit(stateVisit);

    if (visit === "checkout") {
      setVisit(null);
    }
  }, [visit]);

  useEffect(() => {
    if (visit === "checkout") return;
    switch (visit) {
      case "home":
        goTo("/");
        break;

      case "explore":
        goTo("/explore");
        break;

      case "cart":
        goTo("/cart");
        break;

      default:
        break;
    }
  }, []);

  const getCart = JSON.parse(localStorage.getItem("cartExplore")) || [];
  let [count, setCount] = useState(0);
  const handelNotification = () => {
    setCarts((prev) => {
      const array = prev?.map((cart) => {
        return { ...cart, view: true };
      });

      localStorage.setItem("cartExplore", JSON.stringify(array));
      return array;
    });

    setRouteShit((prev) => {
      const result = { route: "cart" };

      localStorage.setItem("currentTest", JSON.stringify(result));

      return result;
    });
  };

  useEffect(() => {
    const countCartView = carts?.filter((cart) => cart.view !== true) || [];

    count = countCartView.length;
    setCount(count);
  }, [carts]);

  useEffect(() => {
    if (routeShit.route === "explore") {
      //goTo("/explore");

      return;
    } else {
    }

    //goTo("/cart");
  }, [routeShit]);

  const handleRouteExplore = (e) => {
    e.preventDefault();

    setRouteShit((prev) => {
      const result = { route: "explore" };

      localStorage.setItem("currentTest", JSON.stringify(result));

      return result;
    });

    goTo("/explore");
  };

  useEffect(() => {
    console.log(menu);
  }, [menu]);

  useEffect(() => {
    return;
    window.addEventListener("click", (e) => {
      const target = e.target;
      const trigger = document.querySelector(".menu-icon") || null;
      const elemLink = target.closest("li") || null;

      console.log(elemLink);

      if (elemLink) {
        const btn = document.querySelector("button");

        btn.click();
        console.log(btn);
      }
      if (elemLink) {
        elemLink.click();
      }

      if (target.classList.contains("menu")) {
        trigger.click();
        setMenu("close");
      }
    });

    window.addEventListener();

    return () => {
      window.removeEventListener("click", handleMenu);
    };
  });

  const handleMenu = (e) => {
    e.stopPropagation();
    const trigger = e.currentTarget;
    const attribute = trigger.getAttribute("data-state");

    const body = document.querySelector("body");

    if (attribute === "menu") {
      setMenu("open");
      trigger.removeAttribute("data-state");
      trigger.setAttribute("data-state", "close");
    }

    if (attribute === "close") {
      setMenu("close");
      trigger.removeAttribute("data-close");
      trigger.setAttribute("data-state", "menu");
    }
  };

  /*
  return (

    <header>
      <div className="container navigation">
        <h2>PENANS LOGO</h2>
        <div className="btn-wrapper">
          <button className="btn btn-primary" onClick={() => goTo(current)}>
            {state}
          </button>
          <button className="cart-btn" onClick={() => goTo("/cart")}>
            CART
          </button>
        </div>
      </div>
    </header>
  );
  */

  const handleRoute = (e) => {
    const link = e.currentTarget.getAttribute("data-link");

    e.preventDefault();

    const saveRoute = (route) => {
      setVisit(route);
      localStorage.setItem("visited", route);
    };

    switch (e.currentTarget.getAttribute("data-link")) {
      case "home":
        saveRoute(link);
        goTo("/");
        break;
      case "explore":
        saveRoute(link);
        goTo("/explore");
        break;
      case "cart":
        saveRoute(link);
        goTo("/cart");
      default:
        break;
    }

    handelNotification();
  };

  const handleNav = (e) => {
    const target = e.target;
    const li = document.querySelector("#cart");
    console.log(li);

    if (li) {
      goTo("/cart");
      setVisit("cart");
    }

    li.click();
  };

  return (
    <header>
      <div className={`nav-container ${menu === "open" ? "active" : ""}`}>
        {/*         
        <h2>PENANS LOGO</h2>
        <div className="btn-wrapper">
          <button className="btn btn-primary" onClick={() => goTo(current)}>
            {state}
          </button>
          <button className="cart-btn" onClick={() => goTo("/cart")}>
            CART
          </button>
        </div> */}

        <div className="box1">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="menu">
          <div className="menu-container">
            <div className="box2">
              <div>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faMap} />

                    <div className={visit === "explore" ? "active" : ""}>
                      <a
                        // onClick={(e) => handleRouteExplore(e)}
                        onClick={(e) => handleRoute(e)}
                        data-link="explore"
                      >
                        Explore
                      </a>
                      <div className="line"></div>
                    </div>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faHome} />
                    <div className={visit === "home" ? "active" : ""}>
                      <a onClick={(e) => handleRoute(e)} data-link="home">
                        Home
                      </a>
                      <div className="line"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="box3">
              <ul onClick={(e) => handleNav(e)}>
                <li
                  className={`cart ${
                    routeShit.route === "cart" ? "active" : ""
                  }`}
                >
                  <button
                    id="cart"
                    onClick={(e) => handleRoute(e)}
                    data-link="cart"
                    className={`cart-icon ${visit === "cart" ? "active" : ""}`}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                  <div className="num">
                    <h4>{count}</h4>
                  </div>
                </li>
                <li>
                  <FontAwesomeIcon icon={faClipboardList} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faCircleUser} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <button
          className="menu-icon"
          onClick={(e) => handleMenu(e)}
          data-state="menu"
        >
          <FontAwesomeIcon icon={menu === "open" ? faClose : faBars} />
        </button>
      </div>
    </header>
  );
}

export default Navigation;
