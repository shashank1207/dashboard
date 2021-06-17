import "./App.css";
import { Fragment, useEffect } from "react";
import "../src/Styles/style.scss";
import Navigate from "./Navigate";
import {useSelector, useDispatch} from 'react-redux';

const App = () => {
  const background = useSelector(state => state.backgroundImg);
  const weather = useSelector(state => state.weather);
  const conditions = weather.weather.main;
  const dispatch = useDispatch();
  const innerHeight = window.innerHeight;
  const innerWidth = window.innerWidth;
  const size = innerWidth + 'x' + innerHeight;

  useEffect(() => {
    const url = "https://source.unsplash.com/"+size+ "/?weather," + conditions 

    dispatch({type: 'BG', val: url})
  }, [weather])

  return (
    <Fragment>
      <div className={`main-container`} style={{backgroundImage: 'url(' + background + ')'}}>
        <Navigate />
      </div>
    </Fragment>
  );
};

export default App;
