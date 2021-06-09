import React from "react";
import Card from "./UI/Card";
import UserPart from "./UserPart";
import Weather from "./Weather";

const UpperPart = () => {
  return (
    <div className={`row upper-part mb-2`}>
      <UserPart />
      <div className={`col-12 col-sm-12 col-md-6 col-lg col-mobile p-0 p-sm-2`}>
        <Card>
          <Weather />
        </Card>
      </div>
    </div>
  );
};

export default UpperPart;
