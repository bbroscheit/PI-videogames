import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className='navbarContainer'>
      <Link to="/home" className='navbarLink'>Back Home</Link>
      <SearchBar />
      <Link to="/videogames" className='navbarLink'>Create your Game</Link>
    </div>
  )
}
