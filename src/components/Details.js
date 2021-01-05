import React from "react";
import "./Details.css";

function Details({ temp, weather, icon }) {
  let sign;
  temp < 0 ? (sign = "negative negative-show") : (sign = "negative");

  return (
    <div className="tempNweather">
      <div className="w-icon">
        <img src={icon} alt={weather} />
      </div>
      <div className="weather">{weather}</div>
      <div className="temperature">
        <p className={sign}>-</p>
        {temp < 10 && temp > 0
          ? "0" + Math.abs(Math.round(temp))
          : Math.abs(Math.round(temp))}
        <p>&#176;</p>
      </div>
    </div>
  );
}

export default Details;
