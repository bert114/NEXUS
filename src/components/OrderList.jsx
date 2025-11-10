import React from "react";

function OrderList({ setCarts, carts }) {
  const order = JSON.parse(localStorage.getItem("cartSelected")) || [];

  return (
    <div className="summary-container">
      {carts?.map((g) => (
        <div className="info" key={g.id}>
          <div className="img-container">
            <img src={g.colorImages[g.availableColors[0]]} alt="" />
          </div>
          <div className="price-flex flex">
            <h3>{g.name}</h3>
            <div>{g.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
