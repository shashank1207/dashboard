import React from "react";

const Card = (props) => {
  return <div className={`card-manual`}>
    <div className={`card-children`}>
    {props.children}
    </div>
  </div>;
};

export default Card;
