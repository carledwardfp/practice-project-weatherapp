import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NextDays.css";

const d = new Date();
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const day2 = days[(d.getDay() + 1) % 7];
const day3 = days[(d.getDay() + 2) % 7];
const day4 = days[(d.getDay() + 3) % 7];
const day5 = days[(d.getDay() + 4) % 7];

const NextDays = ({ cityName }) => {
  const [dayTwo, setDayTwo] = useState("");
  const [dayThree, setDayThree] = useState("");
  const [dayFour, setDayFour] = useState("");
  const [dayFive, setDayFive] = useState("");
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      const CITY = cityName !== "" ? cityName : "Manila";
      const API_KEY = "9b463ab5faf898bca815b6b53d424a9d";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`;

      try {
        const res = await axios.get(url);
        setDayTwo(res.data.list[8]);
        setDayThree(res.data.list[16]);
        setDayFour(res.data.list[24]);
        setDayFive(res.data.list[32]);
        // setIsLoading(false);
      } catch (error) {
        return error;
      }
    };
    fetchAPI();
  }, [cityName]);

  return (
    <div className="nextdays-list">
      <ul>
        <li className="next-days">
          <div className="nd-date">{day2}</div>
          <div className="nd-temp">{Math.round(dayTwo.main.temp)}</div>
          <div className="nd-weather">{dayTwo.weather[0].main}</div>
        </li>

        <li className="next-days">
          <div className="nd-date">{day3}</div>
          <div className="nd-temp">{Math.round(dayThree.main.temp)}</div>
          <div className="nd-weather">{dayThree.weather[0].main}</div>
        </li>

        <li className="next-days">
          <div className="nd-date">{day4}</div>
          <div className="nd-temp">{Math.round(dayFour.main.temp)}</div>
          <div className="nd-weather">{dayFour.weather[0].main}</div>
        </li>

        <li className="next-days">
          <div className="nd-date">{day5}</div>
          <div className="nd-temp">{Math.round(dayFive.main.temp)}</div>
          <div className="nd-weather">{dayFive.weather[0].main}</div>
        </li>
      </ul>
    </div>
  );
};

export default NextDays;
