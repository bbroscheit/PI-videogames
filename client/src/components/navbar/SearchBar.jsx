import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getGamesByName } from '../../actions/index';
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function handleInput(e){
    e.preventDefault()
    setInput(e.target.value)
    
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(getGamesByName(input))
     
  }
  
  return (
    <div className='searchBarContainer'>
      <input className="inputSearchBar" type="text" placeholder='Search ....' onChange={e => handleInput(e)}/>  
      <button className="buttonSearchBar" type='submit' onClick={e => handleSubmit(e)} ><FaSearch /></button> 
      {/* onKeyDown={(e) =>{if(e.key === 'Enter'){handleSubmit()}}}  */}
    </div>
  )
}
