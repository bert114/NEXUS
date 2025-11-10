import React, { useEffect, useState } from "react";
import starIcon from "../assets/icons/starColored.svg";
import noColorIcon from "../assets/icons/star.svg";

import "../scss/preview.scss";

function Ratings({ rating }) {
  const [count, setCount] = useState(true);
  const stars = [1, 2, 3, 4, 5];
  const colored = [];
  const cleanRating = parseInt(rating);
  const test = 1;

  const countStar = () => {
    switch (cleanRating) {
      case 1:
        return (
          <>
            <img src={starIcon} />
            <img src={noColorIcon} />
            <img src={noColorIcon} />
            <img src={noColorIcon} />
            <img src={noColorIcon} />
          </>
        );

      case 2:
        return (
          <>
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={noColorIcon} />
            <img src={noColorIcon} />
            <img src={noColorIcon} />
          </>
        );

      case 3:
        return (
          <>
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={noColorIcon} />
            <img src={noColorIcon} />
          </>
        );

      case 4:
        return (
          <>
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={noColorIcon} />
          </>
        );

      case 5:
        return (
          <>
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={starIcon} />
          </>
        );

      default:
        break;
    }
  };

  return (
    <>
      <ul>{countStar()}</ul>
    </>
  );
}

export default Ratings;
