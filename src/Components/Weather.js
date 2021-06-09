import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faHandPaper,
  faCompressArrowsAlt,
  faWind,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from 'react-redux';

import WeatherCond from "./WeatherCond";

const Weather = (props) => {
  // const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(true);
  const [iconLink, setIconLink] = useState("");
  const weather = useSelector(state => state.weather);
  const dispatch = useDispatch();

  const editCityHandler = () => {};

  const getWeather = useCallback(async () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const response = await fetch(
      BASE_URL + "weather?q=guna&APPID=" + process.env.REACT_APP_WEATHER_KEY
    );

    const responseData = await response.json();
    setIconLink(
      "http://openweathermap.org/img/wn/" +
        responseData.weather[0].icon +
        "@2x.png"
    );
    // setWeather(responseData);
    dispatch({type: 'WEATHER', val: responseData});
    setLoading(false);
  }, []);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  if (loading) {
    return <div></div>;
  }
  return (
    <div className={`container`}>
      <div className={`row font-weight-bold h2`}>Weather</div>
      <div className={`row`}>
        <div className={`col-12 col-lg-4`}>
          <div className={`row`}>
            <div className={`col-7`}>
              <div className={`d-flex align-items-center`}>
                <img src={iconLink} />
                <div className={`d-flex flex-column`}>
                  <div className={`font-weight-bold temp `}>
                    {Math.round(weather.main.temp - 273)}&#x2103;
                  </div>
                  <div>{weather.weather[0].main}</div>
                </div>
              </div>
              <div
                className={`city-name d-flex justify-content-center align-items-center`}
              >
                {weather.name}, {weather.sys.country}
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={editCityHandler}
                  className={`edit-city`}
                  size={"xs"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`col-12 col-lg`}>
          <div className={`row `}>
            <div className={`col`}>
              <div className={`row my-4`}>
                <WeatherCond
                  icon={faTint}
                  name="Humdity"
                  value={`${weather.main.humidity}%`}
                />
                <WeatherCond
                  icon={faHandPaper}
                  name="Feels like"
                  value={`${Math.round(weather.main["feels_like"] - 273)}`}
                />
              </div>
              <div className={`row my-4`}>
                <WeatherCond
                  icon={faCompressArrowsAlt}
                  name="Air Pressure"
                  value={`${weather.main.pressure} hPa`}
                />
                <WeatherCond
                  icon={faWind}
                  name="Wind Speed"
                  value={`${weather.wind.speed} km/h`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
