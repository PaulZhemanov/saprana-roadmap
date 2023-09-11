import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { rootCertificates } from "tls";
import Saprana from "./Saprana";
import { TaskType } from "./Saprana";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "js", isDone: true },
    { id: v1(), title: "jsx", isDone: false },
    { id: v1(), title: "css", isDone: true },
  ]);
  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: string) {
    let filteredtasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredtasks);
  }
  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  function addTask() {
    let newTask = { id: v1(), title: "new task", isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  let tasksForlist = tasks;
  if (filter === "completed") {
    tasksForlist = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForlist = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <Saprana
        title="Frontend"
        tasks={tasksForlist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
