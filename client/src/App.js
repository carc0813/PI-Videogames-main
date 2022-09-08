import './App.css';
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./componentes/LandingPage/LandingPage";
import Home from  "./componentes/Home/Home";
import VideogameCreate from "./componentes/VideogameCreate/VideogameCreate"
import Detail from "./componentes/Detail/Detail";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Switch>
        <Route exact path="/">
          <LandingPage/>
        </Route>
          <Route exact path="/home">
          <Home/>
        </Route>
         <Route exact path="/videogame">
          <VideogameCreate/>           
        </Route>
        <Route exact path="/home/:id">
          <Detail/>           
        </Route>   
       
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
