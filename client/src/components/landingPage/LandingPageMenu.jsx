import React from "react";
import { Link } from "react-router-dom";
import "./LandingPageMenu.css";

export default function LandingPageMenu() {
  return (
    <div class="landingPageMenuContainer">
      <h1 class="landingPageMenuTitle">Welcome to the world of Videogames</h1>
      <Link to="/home">
        <button class="landingPageMenuButton">HERE WE GO!</button>
      </Link>
    </div>
  );
}
