import { createStore } from "redux";

const initialState = {
  weather: {
    weather: [{"main": "Clouds"}],
    sys:{
    country: 'in'
  }},
  news: [],
  isLoggedIn: false,
  backgroundImg: 'https://github.com/shashank1207/dashboard/blob/Master/src/Assets/screen_2x.jpg'
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
  if(action.type === 'BG'){
    return {
      weather: state.weather,
      news: state.news,
      isLoggedIn: state.isLoggedIn,
      backgroundImg: action.val
    }
  }
  return state;
};

const store = createStore(defaultReducer);

export default store;