import React, { useState } from "react";
import "./App.css";
import Saprana from "./Saprana";
import { TaskType } from "./Saprana";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "js", isDone: true },
    { id: v1(), title: "jsx", isDone: false },
    { id: v1(), title: "css", isDone: true },
  ]);

  function removeTask(id: string) {
    let filteredtasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredtasks);
  }
  function changeFilter(todolistId: string, value: FilterValuesType) {
    let todolist = todoLists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value
      setTodolists([...todoLists]);
    }
  }

  function addTask(title: string) {
    let task = { id: v1(), title: title, isDone: false };
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }

  function changeTaskStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  let [todoLists, setTodolists] = useState<Array<TodoListType>> ([
    { id: v1(), title: "frontend", filter: "all" },
    { id: v1(), title: "backend", filter: "all" },
  ]);

  return (
    <div className="App">
      {todoLists.map((tl) => {
        let tasksForlist = tasks;
        if (tl.filter === "completed") {
          tasksForlist = tasks.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForlist = tasks.filter((t) => t.isDone === false);
        }

        return (
          <Saprana
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForlist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
