import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { rootCertificates } from "tls";

function App() {
  return (
    <div className="App">
      <Saprana />
      <Saprana />
    </div>
  );
}

function Saprana() {
  
  return (
    
    <div>
      <button></button>
      <h1>Saprana checklist</h1>
      <ul>
        <li>
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </li>
      </ul>
    </div>
  );
}

export default App;
