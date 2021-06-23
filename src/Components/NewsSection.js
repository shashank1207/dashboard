import React, { useCallback, useEffect, useState } from "react";
import Headline from "./NewsHeading";
import { useDispatch, useSelector } from "react-redux";


const NewsSection = (props) => {
  const disapatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const BASE_URL = process.env.REACT_APP_NEWS_BASE_URL;
  const weather = useSelector((state) => state.weather);
  const [country, setCountry] = useState('in');
  const articles = useSelector(state => state.news);
  const fetchNews = useCallback(async () => {
    const response = await fetch(
      BASE_URL + "country=" + country + "&apiKey=" + API_KEY
    );
    const newsResponse = await response.json();
    disapatch({ type: "NEWS", val: newsResponse.articles });
    setLoading(false);
  }, [country, API_KEY, BASE_URL, disapatch]);
  useEffect(()=>{
    setCountry(weather.sys.country)
  },[weather]);


  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading || articles.length <= 0) {
    return <div></div>;
  }

  const content = articles.map((article) => {
    return <Headline article={article} key={Math.random().toString()} />;
  });

  return (
    <div className={`container-fluid`}>
      <div className={`row font-weight-bold h2 mb-2`}>Trending Headlines</div>
      <div className={`row mt-4`}>
        <div className={`col-12 m-auto`}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
