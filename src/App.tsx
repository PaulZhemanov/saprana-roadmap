import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TodoList, TaskType } from "./TodoList";

export type FilterValuesTypes = "all" | "completed" | "active"


function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "css", isDone: true },
    { id: 2, title: "js", isDone: true },
    { id: 3, title: "react", isDone: false },
    { id: 4, title: "react", isDone: false },
  ]); // деструктуризация массива

  let [filter, setFilter] = useState<FilterValuesTypes>("all");

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }
  function changeFilter(value: FilterValuesTypes) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <div>
        {" "}
        <h1>Saprana Roadmap </h1>
      </div>
      <TodoList
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
      <TodoList
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
      <TodoList
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export function Counter() {
  let arr = useState(5);
  let data = arr[0];
  let setData = arr[1];

  return (
    <div
      onClick={() => {
        setData(data + 1);
      }}
    >
      {data}
    </div>
  );
}
export default App;
