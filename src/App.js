import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import Details from "./components/Details";
import Header from "./components/Header";
import NextDays from "./components/NextDays";

const App = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [weatherMain, setWeatherMain] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);
  const [icon, setIcon] = useState("");
  const [value, setValue] = useState("");
  const [cityName, setCityName] = useState("");

  const ref = useRef();
  

  useEffect(() => {
    const fetchAPI = async () => {
      const CITY = cityName !== "" ? cityName : "Manila";
      const API_KEY = "9b463ab5faf898bca815b6b53d424a9d";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;
      try {
        const res = await axios.get(url);
        setData(res.data);
        setCity(res.data.name);
        setCountry(res.data.sys.country);
        setTemp(res.data.main.temp);
        setWeatherDesc(res.data.weather[0].description);
        setWeatherMain(res.data.weather[0].main);
        setIsLoading(false);
        setIcon(
          `https://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`
        );
      } catch (error) {
        return error;
      }
    //   console.log('data: ', data)
    };
    fetchAPI();

  }, [cityName, city, data]);

  useEffect(()=>{
      const cityName = localStorage.getItem('cityName') ? localStorage.getItem('cityName') : ''
      setCityName(cityName)
  },[])

  const handleToggle = () => {
    setOpenSettings(!openSettings);
    ref.current.focus();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCityName(value);
    setOpenSettings(false);
    setValue("");
    localStorage.setItem('cityName', value)
  };

  let dayOrNight;
  const d = new Date();
  const hour = d.getHours();
  if (hour >= 4 && hour < 6) {
    dayOrNight = "day";
  } else {
    dayOrNight = "night";
  }

  let weather;
  if (
    weatherMain === "Clouds" ||
    weatherMain === "Smoke" ||
    weatherMain === "Mist" ||
    weatherMain === "Haze"
  ) {
    weather = "cloudy";
  } else if (weatherMain === "Rain" || weatherMain === "Snow") {
    weather = "rain";
  } else if (weatherMain === "Clear") {
    weather = "clear";
  }

  const background = `${process.env.PUBLIC_URL}/images/weather-${dayOrNight}-${weather}.png`;

  let iClassName;
  openSettings
    ? (iClassName = "fas fa-caret-up")
    : (iClassName = "fas fa-caret-down");

  let divClassName;
  openSettings ? (divClassName = "form form-active") : (divClassName = "form");

  return (
    <>
      <div className="error">
        <div>
          Use a mobile phone to view content. This app is for practice purposes
          only.
        </div>
        <div>
          <em>
            Press F12 and then change device to any of the phone devices
            available.
          </em>
        </div>
      </div>
      <div
        className="background"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        {isLoading ? (
          <p>If the content is still not loading, the api key might be temporary blocked due to exceeding of requests limitation. If that's the case, please contact me at https://official-carledwardfp.github.io/portfolio/</p>
        ) : (
          <>
            <div className="settings">
              <button onClick={handleToggle}>
                <i className={iClassName} />
              </button>
            </div>

            <div className={divClassName}>
              <form>
                <input
                  type="text"
                  placeholder="Change city"
                  value={value}
                  onChange={handleChange}
                  style={{
                    width: 200,
                    height: 30,
                    border: "none",
                    ontSize: "1rem",
                    outline: "none",
                    textAlign: "center",
                    margin: 10,
                    fontSize: 25,
                    color: "white",
                    backgroundColor: "transparent",
                  }}
                  ref={ref}
                />
                <button
                  onClick={handleSubmit}
                  type="submit"
                  style={{
                    backgroundColor: "#7070ff",
                    color: "white",
                    border: "none",
                    width: 200,
                    height: 40,
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  <i className="fas fa-search-location" />
                </button>
              </form>
            </div>

            <div className="container">
              <Header city={city} country={country} openSettings={openSettings} />
              <Details temp={temp} weather={weatherDesc} icon={icon} />
              <NextDays cityName={cityName}/>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
