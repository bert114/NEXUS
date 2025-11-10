import React from "react";
import Load from "./Load";
import("../scss/loadingWrapper.scss");

function LoadingWrapper() {
  return (
    <div className="loading-wrapper">
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}

export default LoadingWrapper;
