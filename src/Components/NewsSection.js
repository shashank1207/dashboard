import React, { useEffect, useState } from "react";
import Headline from "./NewsHeading";
import { useDispatch, useSelector } from "react-redux";

const Dummy = [
  {
    source: {
      id: null,
      name: "NDTV News",
    },
    author: null,
    title:
      "New Covid Strain Detected By Pune Virologists, Not Found In Indian Cases - NDTV",
    description:
      "A new Covid variant that needs more antibodies to fight it and has more severe symptoms has been found by the National Institute of Virology in Pune. The variant - B.1.1.28.2 - was detected in samples from two travellers from Brazil but not from anyo",
    url: "https://www.ndtv.com/india-news/new-covid-strain-detected-by-pune-virologists-not-found-in-indian-cases-2459296",
    urlToImage:
      "https://c.ndtvimg.com/2020-04/fuje0e1c_coronavirus-generic-reuters-650_625x300_21_April_20.jpg",
    publishedAt: "2020-07-08T13:46:04Z",
    content:
      "No sample sequenced from India so far has been of this variant, NIV scientists said (Representational)\r\nA new Covid variant that needs more antibodies to fight it and has more severe symptoms has bee… [+1882 chars]",
  },
];

const NewsSection = (props) => {
  const disapatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const BASE_URL = process.env.REACT_APP_NEWS_BASE_URL;
  const weather = useSelector((state) => state.weather);
  const [country, setCountry] = useState('in');
  const articles = useSelector(state => state.news);
  const fetchNews = async () => {
    const response = await fetch(
      BASE_URL + "country=" + country + "&apiKey=" + API_KEY
    );
    const newsResponse = await response.json();
    disapatch({ type: "NEWS", val: newsResponse.articles });
    setLoading(false);
  };
  useEffect(()=>{
    setCountry(weather.sys.country  )
  },[weather]);


  useEffect(() => {
    fetchNews();
  }, []);

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
