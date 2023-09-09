import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { rootCertificates } from "tls";
import Saprana from "./Saprana";
import { TasksType } from "./Saprana";
import { PropsType } from "./Saprana";

function App() {
  let tasks1: Array<TasksType> = [
    { id: 1, title: "js", isDone: true },
    { id: 2, title: "jsx", isDone: false },
    { id: 3, title: "css", isDone: true },
  ];

  let tasks2: Array<TasksType> = [
    { id: 1, title: "node.js", isDone: true },
    { id: 2, title: "redux", isDone: false },
    { id: 3, title: "next.js", isDone: true },
  ];

  return (
    <div className="App">
      <Saprana title="Frontend" tasks={tasks1} />
      <Saprana title="Backend" tasks={tasks2} />
    </div>
  );
}

export default App;
