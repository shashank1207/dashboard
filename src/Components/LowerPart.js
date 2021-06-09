import React from "react";
import Todo from "./ToDo";
import Card from "./UI/Card";

const LowerPart = (props) => {
  return (
    <div className={`row lower-part tasks-card mb-2`}>
      <div className={`col p-0`}>
        <Card>
          <Todo />
        </Card>
      </div>
    </div>
  );
};

export default LowerPart;