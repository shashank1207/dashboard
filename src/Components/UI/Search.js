import React, { useState } from "react";
import Google from "../../Assets/google";

const Search = (props) => {
  const [search, setSearch] = useState("");

  const inputChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    window.open("https://www.google.com/search?query=" + search, "_blank");
    setSearch("");
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className={`form-control d-flex input-form my-3 `}
    >
      <Google className={`google`} />
      <input value={search} onChange={inputChangeHandler} />
    </form>
  );
};

export default Search;
