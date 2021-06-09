import React from "react";

const Headline = (props) => {
  const today = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const articleDate = new Date(props.article.publishedAt).getTime();
  const days = Math.round(Math.abs((today - articleDate) / oneDay));

  const dayFunction = () => {
    if (days === 0) {
      return "Today";
    } else if (days === 1) {
      return "Yesterday";
    } else if (days > 1 && days <= 30) {
      return days + " Days ago";
    } else if (days > 30 && days <= 365) {
      const months = Math.floor(days / 30);
      if (months <= 1) {
        return "1 Month ago";
      } else {
        return months + " Months ago";
      }
    } else {
      const year = Math.floor(days / 365);
      if (year === 1) {
        return "1 Year ago";
      } else {
        return year + " Years ago";
      }
    }
  };

  const openArticle = (url) => {
    window.open(url, '_blank')
  }

  return (
    <div className={`news-div`} onClick={() => openArticle(props.article.url)}>
      <div className={`row mb-3`}>
        <div className={`news-el`}>
          <div className={`col-8`}>
            <div
              className={`d-flex flex-column align-items-stretch justfy-content-stretch h-100`}
            >
              <div className={`heading`}>{props.article.title}</div>
              <div>{props.article.source.name}</div>
              <div className={`mb-0 mt-auto`}>{dayFunction()}</div>
            </div>
          </div>
          <div className={`col-2 d-flex justify-content-center img-div`}>
            <img src={props.article.urlToImage} className={`img-fluid`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headline;
