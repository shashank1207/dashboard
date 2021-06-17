import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faHandPaper,
  faCompressArrowsAlt,
  faWind,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import WeatherCond from "./WeatherCond";

const Weather = (props) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [iconLink, setIconLink] = useState("");
  const weather = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  const cityState = useSelector(state => state.city);

  const editCityHandler = () => {
    dispatch({type: 'EDIT', val: true})
  };

  const getWeather = useCallback(async () => {
    const token = localStorage.getItem('token')

    const user = await fetch('https://dashboard-7611d-default-rtdb.firebaseio.com/users/' + token + '.json');
    const userData = await user.json();

    const city = userData.city;

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const response = await fetch(
      BASE_URL + "weather?q=" + city +  "&APPID=" + process.env.REACT_APP_WEATHER_KEY
    );
    const responseData = await response.json();
    setIconLink(
      "http://openweathermap.org/img/wn/" +
        responseData.weather[0].icon +
        "@2x.png"
    );

    const forecastRes = await fetch(
      BASE_URL + "forecast?q=" + city +"&appid=" + process.env.REACT_APP_WEATHER_KEY
    );


    const forecastResData = await forecastRes.json();
    const d = new Date();
    const h = d.getHours();
    const date = d.getDate();
    const newList = forecastResData.list.slice(0, 7);
    const list = [];
    newList.forEach((el, index) => {
      if (index <= 5) {
        list.push(el);
      }
      return;
    });
    setForecast(list);
    dispatch({ type: "WEATHER", val: responseData });

    setLoading(false);
  },[dispatch]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  useEffect(()=> {
    const timer = setTimeout(()=>{
      getWeather();
    }, 2000);

    return () => {
      clearTimeout(timer);
    }
  }, [cityState, getWeather]);

  const content = forecast.map((el) => {
    const d = new Date(el.dt_txt);
    const hour = d.getHours();
    const minute = d.getMinutes();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    return (
      <div className={`col-md-4 col-lg-4 col-xl-2 my-sm-2 mx-1 forecast-el`} key={Math.random()}>
        {Math.round(el.main.temp - 273)} &#x2103;
        <img
          src={
            "http://openweathermap.org/img/wn/" + el.weather[0].icon + "@2x.png"
          } className={`img-fluid`}
        />
        <span className={`text-center`}>{hour}:{minute}</span>
        <span className={`text-center`}>{date}-{month}</span>
      </div>
    );
  });

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
      <div className={`d-none d-sm-none d-lg-flex`}>
        <div className={`col`}>
          <div
            className={`row w-100`}
            style={{ justifyContent: "space-between" }}
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
