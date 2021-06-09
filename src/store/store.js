import { createStore } from "redux";

const initialState = {
  weather: {
    sys:{
    country: 'in'
  }},
  news: []
}

const defaultReducer = (state = initialState, action) => {
  if (action.type === 'WEATHER'){
    return {
      weather: action.val,
      news: state.news
    }
  }
  if (action.type === "NEWS"){
    return {
      weather: state.weather,
      news: action.val
    }
  }
  return state;
};

const store = createStore(defaultReducer);

export default store;