import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../scss/home.scss";
import heroImg from "../assets/landing/image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faClockFour,
  faDatabase,
  faGamepad,
  faHeadphones,
  faHouseLaptop,
  faLaptop,
  faLaptopCode,
  faLaptopFile,
  faMobileAndroid,
  faPhone,
  faRectangleAd,
  faTransgenderAlt,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  faNotion,
  faWatchmanMonitoring,
} from "@fortawesome/free-brands-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import Navigation from "../components/Navigation";

function Home() {
  const goTo = useNavigate();
  const [carts, setCarts] = useState(
    JSON.parse(localStorage.getItem("cartExplore")) || []
  );

  const handleRoute = (e) => {
    localStorage.setItem("visited", "explore");
    goTo("/explore");
  };

  return (
    <>
      <Navigation carts={carts} setCarts={setCarts} />
      <main>
        <section className="hero section">
          <div className="flex">
            <div className="hero-content">
              <h1>Discover Gadgets You Won't Find Anywhere Else</h1>
              <p>
                We test hundreds of gadgets to bring you only the most
                innovative, useful, and downright cool tech for your everyday
                life.
              </p>
              <div className="btn-cta">
                <button className="" onClick={(e) => handleRoute(e)}>
                  Explore
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="img-container">
                <img
                  src={heroImg}
                  alt="Aura Pro Headphones in matte black, side profile"
                  id="main-product-image"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="trust section">
          <header className="trust-header">
            <div className="header-content">
              <h2>Why Choose Our Smart Gadget</h2>

              <p>
                Experience the future with our innovative technology designed to
                simplify your daily life
              </p>
            </div>
          </header>

          <section>
            <ul className="cards-grid">
              <li className="trust-card box1">
                <div className="card-content">
                  <FontAwesomeIcon icon={faNotion} />
                  <div className="highlight">4.8/5</div>
                  <h3>Customer Rated</h3>
                  <p>
                    Highly reviewed for reliability and user-friendly design
                  </p>
                </div>
              </li>

              <li className="trust-card box2">
                <div className="card-content">
                  <FontAwesomeIcon icon={faNotion} />

                  <div className="highlight">2-Year</div>
                  <h3>Warranty</h3>
                  <p>Comprehensive protection with dedicated support</p>
                </div>
              </li>

              <li className="trust-card box3">
                <div className="card-content">
                  <FontAwesomeIcon icon={faNotion} />

                  <div className="highlight">24/7</div>
                  <h3>Support</h3>
                  <p>Round-the-clock customer service and troubleshooting</p>
                </div>
              </li>
            </ul>
          </section>
        </section>

        <section className="cats-showcase">
          <div className="flex-container">
            <h2>Find Your Next Favorite Gadget</h2>
            <ul>
              <li>
                <div className="img">
                  <img src={heroImg} alt="" />
                  <FontAwesomeIcon icon={faHouseLaptop} />
                </div>

                <h3>Laptop</h3>
              </li>

              <li>
                <div className="img">
                  <img src={heroImg} alt="" />
                  <FontAwesomeIcon icon={faMobileAndroid} />
                </div>

                <h3>Phone</h3>
              </li>

              <li>
                <div className="img">
                  <img src={heroImg} alt="" />
                  <FontAwesomeIcon icon={faHeadphones} />
                </div>

                <h3>Audio</h3>
              </li>
              <li>
                <div className="img">
                  <img src={heroImg} alt="" />
                  <FontAwesomeIcon icon={faGamepad} />
                </div>

                <h3>Gaming</h3>
              </li>
              <li>
                <div className="img">
                  <FontAwesomeIcon icon={faDatabase} />

                  <img src={heroImg} alt="" />
                </div>

                <h3>Storage</h3>
              </li>
              <li>
                <div className="img">
                  <FontAwesomeIcon icon={faClockFour} />

                  <img src={heroImg} alt="" />
                </div>

                <h3>Wearable</h3>
              </li>
              <li>
                <div className="img">
                  <FontAwesomeIcon icon={faCamera} />

                  <img src={heroImg} alt="" />
                </div>

                <h3>Camera</h3>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );

  /*
  return (

    
    <>
      <>
        
        <div className="home">
          <div className="header-home">HEADER</div>
          <div className="show-case">
            <div className="info">
              <button
                onClick={() => goTo("./explore")}
                className="btn-primary btn"
              >
                EXPLORE
              </button>
            </div>

            <picture></picture>
          </div>
        </div>
      </>
    </>
  );
  */
}

export default Home;
