import React from "react";
import "./App.css";
import Layout from "./Layout";
import { BrowserRouter, NavLink } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <header className="container">
        <nav className="row">
          <ul className="twelve columns">
            <li>
              <NavLink to="/" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="Archive">Archive</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="App container">
        <div className="row">
          <div className="twelve columns">
            <h4 className="center">
              Simple <em>~to-do~</em> List
            </h4>
            <Layout />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
