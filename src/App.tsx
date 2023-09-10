import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { rootCertificates } from "tls";
import Saprana from "./Saprana";
import { TasksType } from "./Saprana";
import { PropsType } from "./Saprana";

function App() {
  let [tasks, setTasks] = useState([
    { id: 1, title: "js", isDone: true },
    { id: 2, title: "jsx", isDone: false },
    { id: 3, title: "css", isDone: true },
    { id: 4, title: "css", isDone: true },
  ]);

  function removeTask(id: number) {
    let filteredtasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredtasks);
  }


  return (
    <div className="App">
      <Saprana title="Frontend" tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;
