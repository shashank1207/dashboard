import React from "react";

const Card = (props) => {
  return <div className={`card-manual ${props.className}`}>
    <div className={`card-children h-100`}>
    {props.children}
    </div>
  </div>;
};

export default Card;
