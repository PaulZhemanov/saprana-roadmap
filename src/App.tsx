import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { rootCertificates } from "tls";

function App() {
  return (
    <div>
      <Saprana />
      <Saprana />
    </div>
  );
}

function Saprana() {
  
  return (
    
    <div>
      <ul>
        <li>
          <input type="text" />
          <span></span>
          <input type="text" />
          <input type="text" />
        </li>
      </ul>
    </div>
  );
}

export default App;
