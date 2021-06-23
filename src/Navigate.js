import React, { Fragment, useCallback, useEffect} from "react";
import Authentcate from "./Components/Authenticate";
import Dashboard from "./Components/Dashboard";
import {useDispatch, useSelector} from 'react-redux';
const Navigate = (props) => {
  const loggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    if (localStorage.getItem('token')){
      dispatch({type: 'LOGIN', val: true});
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return (
    <Fragment>
      {!loggedIn && <Authentcate/>}
      {loggedIn && <Dashboard />}
    </Fragment>
  );
};

export default Navigate;