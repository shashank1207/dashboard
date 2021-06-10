import React, { Fragment, useEffect, useState } from "react";
import Authentcate from "./Components/Authenticate";
import Dashboard from "./Components/Dashboard";
import {useDispatch, useSelector} from 'react-redux';
const Navigate = (props) => {
  const loggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  const fetchData = () => {
    if (localStorage.getItem('token')){
      dispatch({type: 'LOGIN', val: true});
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Fragment>
      {!loggedIn && <Authentcate/>}
      {loggedIn && <Dashboard />}
    </Fragment>
  );
};

export default Navigate;