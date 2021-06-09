import React from "react";
import LowerPart from "./LowerPart";
import NewsSection from "./NewsSection";
import Card from "./UI/Card";

import UpperPart from "./UpperPart";


const Dashboard = () => {

  return (
    <div className={ `container-fluid main`}>
      <UpperPart />
      <LowerPart />
      <div className={`row lower-part news-card mb-2`}>
        <div className={`col p-0`}>
          <Card>
            <NewsSection />
          </Card>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;