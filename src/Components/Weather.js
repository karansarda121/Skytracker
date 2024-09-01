import React, { useState } from "react";
import "./Weather.css";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import hazeImage from "../haze.png"; // Import your custom haze image
import mistImage from "../mist.png"; // Import your custom mist image

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null); // Initialize as null
  const [error, setError] = useState("");

  const API_KEY = "5acc1683650652bab831ecf7d57fd397";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  function handleOnChange(event) {
    setCity(event.target.value);
  }

  async function fetchData() {
    try {
      let response = await fetch(url);
      let output = await response.json();
      if (response.ok) {
        setWeather(output);
        setError("");
      } else {
        setError("No data found. Please enter a valid city name.");
        setWeather(null); // Clear previous data if no city is found
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setWeather(null); // Clear previous data if there is an error
    }
  }

  // Handle Enter key press for search
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      fetchData();
    }
  }

  return (
    <div className="container">
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown} // Listen for Enter key
          placeholder="Enter any city name"
        />
        <button onClick={fetchData}>
          <FaSearch />
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weather && weather.weather && (
        <div className="content">
          <div className="weather-image">
            <img
              src={
                weather.weather[0].main.toLowerCase() === "haze"
                  ? hazeImage
                  : weather.weather[0].main.toLowerCase() === "mist"
                  ? mistImage
                  : `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
              }
              alt={weather.weather[0].description || "Weather condition"}
            />
            <h3 className="desc">
              {weather.weather[0].description || "Weather"}
            </h3>
          </div>

          <div className="weather-temp">
            <h2>
              {weather.main.temp}
              <span>&deg;C</span>
            </h2>
          </div>

          <div className="weather-city">
            <div className="location">
              <MdLocationOn />
            </div>
            <p>
              {weather.name}, <span>{weather.sys.country}</span>
            </p>
          </div>

          <div className="weather-stats">
            <div className="stat-box">
              <div className="icon">
                <FaWind />
              </div>
              <div className="value">
                {weather.wind.speed} <span>Km/h</span>
              </div>
              <div className="label">Wind Speed</div>
            </div>
            <div className="stat-box">
              <div className="icon">
                <WiHumidity />
              </div>
              <div className="value">
                {weather.main.humidity} <span>%</span>
              </div>
              <div className="label">Humidity</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
