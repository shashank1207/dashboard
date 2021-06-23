import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "./UI/Card";
import CitiesObject from "../Assets/Cities.json";

const EditCity = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [searchedCity, setSearchedCity] = useState([]);
  const [options, setOptions] = useState([]);
  const onCancelClick = () => {
    dispatch({ type: "EDIT", val: false });
  };
  const [enteredCity, setEnteredCity] = useState("");

  const cityOptionsLoader = (name) => {
    const cityList = CitiesObject.filter((city) => {
      return city.name.toLowerCase().search(name.toLowerCase()) !== -1;
    });
    setSearchedCity(cityList);
  };

  useEffect(() => {
    const data = searchedCity.map((city) => {
      return <option>{city.name}</option>;
    });

    setOptions(data);
  }, [searchedCity]);

  const changeHandler = (event) => {
    setEnteredCity(event.target.value);
    cityOptionsLoader(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (enteredCity.trim().length <= 0) {
      setError(true);
      return;
    }
    dispatch({ type: "Change", val: enteredCity });

    const response = await fetch(
      "https://dashboard-7611d-default-rtdb.firebaseio.com/users/" +
        localStorage.getItem("token") +
        ".json"
    );

    const responseData = await response.json();

    const updatedResponseData = { ...responseData, city: enteredCity };
    await fetch(
      "https://dashboard-7611d-default-rtdb.firebaseio.com/users/" +
        localStorage.getItem("token") +
        ".json",
      {
        method: "PATCH",
        body: JSON.stringify(updatedResponseData),
      }
    );

    onCancelClick();
  };

  return (
    <Card className={`modal-card`}>
      <form className={`d-flex flex-column`} onSubmit={onSubmitHandler}>
        <label htmlFor="city">City</label>
        <input
          list="cities"
          value={enteredCity}
          autoComplete="off"
          id="city"
          onChange={changeHandler}
        />
        <datalist id="cities">
          <optgroup>{options}</optgroup>
        </datalist>
        {error && <p>Please Input valid city</p>}
        <div className={`d-flex justify-content-end my-3`}>
          <button
            className={`mr-2 cancel-button p-2`}
            type="button"
            onClick={onCancelClick}
          >
            Cancel
          </button>
          <button type="submit" className={`submit-button p-2`}>
            Submit
          </button>
        </div>
      </form>
    </Card>
  );
};

export default EditCity;
