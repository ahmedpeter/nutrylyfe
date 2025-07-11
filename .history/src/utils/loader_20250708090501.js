// src/components/common/Loader.jsx

import React from "react";
import "./Loader.css";

const Loader = ({ size = "medium", color = "primary", message = "" }) => {
  return (
    <div className={`loader-container loader-${size}`}>
      <div className={`ms-circle12 ms-child ${color}`}></div>
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

export default Loader;
