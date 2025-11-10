import React, { useState } from "react";
import { getData, test } from "../helper/util";

function Colors({ colors, gadget }) {
  const handleColor = (e, color) => {
    const elem = e.target;

    const img = elem.closest(".card").querySelector("img");

    const id = elem.closest(".card").getAttribute("id");

    const textClr = color;

    const filter = gadget.find((g) => g.id === id);
    img.src = filter.colorImages[textClr];
  };

  const replace = (color) => {
    return color.replace(/ /g, "-");
  };

  return (
    <>
      <div className="colors-wrapper">
        <h3>Available Colors</h3>
        <div className="btn-wrapper">
          {colors.availableColors.map((color) => (
            <button
              onClick={(e) => handleColor(e, color)}
              key={color}
              className={replace(color).toLowerCase()}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Colors;
