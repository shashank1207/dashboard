import { createStore } from "redux";

const initialState = {
  weather: {
    weather: [{ main: "Clouds" }],
    sys: {
      country: "in",
    },
  },
  news: [],
  isLoggedIn: false,
  backgroundImg:
    "https://github.com/shashank1207/dashboard/blob/Master/src/Assets/screen_2x.jpg",
  editingCity: false,
  city: "",
};

const defaultReducer = (state = initialState, action) => {
  if (action.type === "WEATHER") {
    return {
      weather: action.val,
      news: state.news,
      isLoggedIn: state.isLoggedIn,
      editingCity: state.editingCity,
      city: state.city,
    };
  }
  if (action.type === "NEWS") {
    return {
      weather: state.weather,
      news: action.val,
      isLoggedIn: state.isLoggedIn,
      editingCity: state.editingCity,
      city: state.city,
    };
  }
  if (action.type === "LOGIN") {
    return {
      weather: state.weather,
      news: state.news,
      isLoggedIn: action.val,
      editingCity: state.editingCity,
      city: state.city,
    };
  }
  if (action.type === "BG") {
    return {
      weather: state.weather,
      news: state.news,
      isLoggedIn: state.isLoggedIn,
      backgroundImg: action.val,
      editingCity: state.editingCity,
      city: state.city,
    };
  }
  if (action.type === "EDIT") {
    return {
      weather: state.weather,
      news: state.news,
      isLoggedIn: state.isLoggedIn,
      backgroundImg: state.backgroundImg,
      editingCity: action.val,
      city: state.city,
    };
  }
  if(action.type === 'Change'){
    return{
      weather: state.weather,
      news: state.news,
      isLoggedIn: state.isLoggedIn,
      backgroundImg: state.backgroundImg,
      editingCity: state.val,
      city: action.val,
    }
  }
  return state;
};

const store = createStore(defaultReducer);

export default store;
