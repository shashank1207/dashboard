import React, { useState } from "react";
import Card from "./Card";
import {useDispatch} from 'react-redux';

const DetailsInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const nameInputHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const cityInputHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    if (enteredName.trim().length < 1 || enteredCity.trim().length < 1) {
      setIsEmpty(true);
      setIsEditing(false);
      return;
    }
    const data = {
      name: enteredName,
      city: enteredCity,
    };
    const response = await fetch('https://dashboard-7611d-default-rtdb.firebaseio.com/users.json', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    localStorage.setItem('token', responseData.name)
    dispatch({type: 'LOGIN', val: true});
  };

  return (
    <Card className={`w-auto detail-card justify-content-center`}>
      <form
        className={`detail-form w-100 align-items-center`}
        onSubmit={onSubmitHandler}
      >
        <div className={`mb-4 w-100`}>
          <label htmlFor="name">Name</label>
          <input
            className={`w-100`}
            type="text"
            autoComplete="off"
            autoCapitalize="words"
            id={`name`}
            value={enteredName}
            onChange={nameInputHandler}
            onFocus={() => {setIsEditing(true);
            setIsEmpty(false)
            }}
          />
        </div>
        <div className={`mb-4 w-100`}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            className={`w-100`}
            id="city"
            autoComplete="off"
            onChange={cityInputHandler}
            value={enteredCity}
            onFocus={() => {setIsEditing(true);
              setIsEmpty(false)
              }}
          />
        </div>
        {isEmpty && !isEditing && <p>Please don't leave input field blank.</p>}
        <div
          className={`detail-button my-3 w-100 d-flex justify-content-center`}
        >
          <button className={``}>Submit</button>
        </div>
      </form>
    </Card>
  );
};

export default DetailsInput;
