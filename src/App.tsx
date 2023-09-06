import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TodoList, TaskType } from "./TodoList";
import { v1 } from "uuid";
import { fail } from "assert";

export type FilterValuesTypes = "all" | "completed" | "active";
 
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesTypes;
};

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "css", isDone: true },
    { id: v1(), title: "js", isDone: true },
    { id: v1(), title: "react", isDone: false },
    { id: v1(), title: "react", isDone: false },
  ]); // деструктуризация массива


  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };

    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    // let copy = [...tasks] 
    // setTasks(copy);
    setTasks([...tasks]);

  }

  function changeFilter(value: FilterValuesTypes, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }



  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: v1(), title: "what to learn", filter: "active" },
    { id: v1(), title: "what to todo", filter: "completed" }
  ]);

  return (
    <div className="App">
      <div>
        <h1>Saprana Roadmap </h1>
      </div>
      {todolists.map((tl) => {
          let tasksForTodoList = tasks;
          if (tl.filter === "completed") {
            tasksForTodoList = tasks.filter((t) => t.isDone === true);
          }
          if (tl.filter === "active") {
            tasksForTodoList = tasks.filter((t) => t.isDone === false);
          }
        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask} 
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
          />
        );
      })}
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
