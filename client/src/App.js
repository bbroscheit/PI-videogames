import "./App.css";
import { Route } from "react-router-dom";
import React from "react";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./components/home/Home.jsx";
import CharacterCreate from './components/createGame/CharacterCreate.jsx';
import Detail from './components/detail/Detail.jsx';

function App() {
  return (
    <React.Fragment>
      <Route path="/home" component={Navbar}/>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route path="/videogames" component={CharacterCreate} />
      <Route path="/home/:id" component={Detail} />
    </React.Fragment>
  );
}

export default App;
