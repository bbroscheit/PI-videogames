import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getGamesByName } from "../../actions/index";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getGamesByName(input));
    
  }

  function handleKeyDown(e){
    e.preventDefault();
    dispatch(getGamesByName(input));
  }

  return (
    <div className="searchBarContainer">
      <input
        className="inputSearchBar"
        type="text"
        placeholder="Search ...."
        onChange={(e) => handleInput(e)}
        onKeyDown={(e) => {if(e.key === "Enter"){handleKeyDown(e)}}}
      />
      <button
        className="buttonSearchBar"
        type="submit"
        onClick={(e) => handleSubmit(e)}
        
        
      >
        <FaSearch />
      </button>
    </div>
  );
}
