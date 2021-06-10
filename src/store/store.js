import { createStore } from "redux";

const initialState = {
  weather: {
    sys:{
    country: 'in'
  }},
  news: [],
  isLoggedIn: false
}

const defaultReducer = (state = initialState, action) => {
  if (action.type === 'WEATHER'){
    return {
      weather: action.val,
      news: state.news,
      isLoggedIn: state.isLoggedIn
    }
  }
  if (action.type === "NEWS"){
    return {
      weather: state.weather,
      news: action.val,
      isLoggedIn: state.isLoggedIn
    }
  }
  if (action.type === 'LOGIN'){
    return {
      weather: state.weather,
      news: state.news,
      isLoggedIn: action.val
    }
  }
  return state;
};

const store = createStore(defaultReducer);

export default store;