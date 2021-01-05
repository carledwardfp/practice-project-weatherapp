import React from "react";
import "./Header.css";

/* FOR DATE START */
const d = new Date();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const day = days[d.getDay()];
const date = d.getDate();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = months[d.getMonth()];
/* FOR DATE END */

function Header({ city, country }) {
  return (
    <header>
      <nav>
        <div className="city">
          {city}, {country}
        </div>
      </nav>
      <div className="date">
        {day}, {date} {month}
      </div>
    </header>
  );
}

export default Header;
