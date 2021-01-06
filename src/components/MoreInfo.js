import React from "react";
import "./MoreInfo.css";

function MoreInfo({ wind, pressure, humidity }) {
  return (
    <div className="more-info">
      <div className="info wind">
        <div className="info-icon">
          <i className="fas fa-wind" />
        </div>
        <div className="info-num">
          {wind.speed}, {wind.deg}&#176;
        </div>
        <div className="info-name">Wind</div>
      </div>
      <div className="info pressure">
        <div className="info-icon">
          <i className="fab fa-product-hunt" />
        </div>
        <div className="info-num">
          {Math.round(pressure / 33.864).toFixed(2)} inHg
        </div>
        <div className="info-name">Pressure</div>
      </div>
      <div className="info humidity">
        <div className="info-icon">
          <i className="fas fa-tint" />
        </div>
        <div className="info-num">{humidity}</div>
        <div className="info-name">Humidity</div>
      </div>
    </div>
  );
}

export default MoreInfo;
