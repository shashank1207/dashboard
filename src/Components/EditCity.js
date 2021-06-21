import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "./UI/Card";

const EditCity = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const onCancelClick = () => {
    dispatch({ type: "EDIT", val: false });
  };
  const [enteredCity, setEnteredCity] = useState("");
  const changeHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  const onSubmitHandler =async(event)=> {
    event.preventDefault();
    if(enteredCity.trim().length <= 0){
      setError(true);
      return;
    }
    dispatch({type: 'Change', val: enteredCity});

    const response = await fetch('https://dashboard-7611d-default-rtdb.firebaseio.com/users/' + localStorage.getItem('token') + ".json");

    const responseData = await response.json();

    const updatedResponseData = {...responseData, city: enteredCity}
    const request = await fetch(
      "https://dashboard-7611d-default-rtdb.firebaseio.com/users/"+ localStorage.getItem('token') +
        ".json",
        {
          method: 'PATCH',
          body: JSON.stringify(updatedResponseData)
        }
    );

    onCancelClick();
  }

  return (
    <Card className={`modal-card`}>
      <form className={`d-flex flex-column`} onSubmit={onSubmitHandler}>
        <label htmlFor="city">City</label>
        <input value={enteredCity} autoComplete='off' id="city" onChange={changeHandler} />
        {error && <p>Please Input valid city</p>}
        <div className={`d-flex justify-content-end my-3`}>
          <button className={`mr-2 cancel-button p-2`} type='button' onClick={onCancelClick}>
            Cancel
          </button>
          <button type='submit' className={`submit-button p-2`}>Submit</button>
        </div>
      </form>
    </Card>
  );
};

export default EditCity;
