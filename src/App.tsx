import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { rootCertificates } from "tls";

function App() {
  return (
    <div className="App">
      <Saprana title="Frontend" />
      <Saprana title="Backend" />
    </div>
  );
}

type PropsType = {
  title: string;
};

function Saprana(props: PropsType) {
  return (
    <div>
      <h1>{props.title}</h1>
      <input />
      <button>Add</button>
      <ul>
        <li>
          <input type="checkbox" />
          <span>jsx</span>
          <button>Remove</button>
        </li>
      </ul>{" "}
      <ul>
        <li>
          <input type="checkbox" />
          <span>tsx</span>
          <button>Remove</button>
        </li>
      </ul>{" "}
      <ul>
        <li>
          <input type="checkbox" />
          <span>graphql</span>
          <button>Remove</button>
        </li>
      </ul>
    </div>
  );
}

export default App;
