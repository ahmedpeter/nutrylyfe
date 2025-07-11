// src/components/common/Loader.jsx
import React from "react";
// import "./Loader.css";

const Loader = ({ message = "Loading...", showMessage = true }) => {
  return (
    <div className="loader-wrapper">
      <div className="spinner spinner-8">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={`ms-circle${index + 1} ms-child`}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
