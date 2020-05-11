import React from "react";
import "./App.css";
import Layout from "./Layout";

function App() {
  return (
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
  );
}

export default App;
