import React, { useState } from "react";
import DetailsInput from "./UI/DetailsInput";

const Authenticate = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className={`container`}>
      <DetailsInput isSubmitted={setIsSubmitted} />
    </div>
  );
};

export default Authenticate;