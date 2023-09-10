import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { rootCertificates } from "tls";
import Saprana from "./Saprana";
import { TaskType } from "./Saprana";


export type FilterValuesType = "all" | "completed" | "active"

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "js", isDone: true },
    { id: 2, title: "jsx", isDone: false },
    { id: 3, title: "css", isDone: true },
  ]);
  let [filter, setFilter] = useState<FilterValuesType>("all");

function removeTask(id: number) {
    let filteredtasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredtasks);
  }
  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  let tasksForlist = tasks
  if (filter === "completed") {
    tasksForlist = tasks.filter(t => t.isDone ===true)
  }
  if (filter === "active") {
    tasksForlist = tasks.filter(t => t.isDone ===false)
  }

  return (
    <div className="App">
      <Saprana
        title="Frontend"
        tasks={tasksForlist}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
