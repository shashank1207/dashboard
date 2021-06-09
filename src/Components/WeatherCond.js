import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WeatherCond = (props) => {
  return (
    <div className={`col-4`}>
      <div className={`row`}>
        <span className={`icon col-3`}>
          <FontAwesomeIcon icon={props.icon} className={`icon mx-3`} />
        </span>
        <div className={`d-flex flex-column font-weight-bold`}>
          {props.name}
          <div>{props.value}{props.name === "Feels like" && <span>&#x2103;</span>}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCond;
