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
  function removeTask(todolistId: string, id: string) {
    debugger;
    let tasks = tasksObj[todolistId];
    let filteredtasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredtasks;
    setTasks({ ...tasksObj });
  }

  function addTask(todolistId: string, title: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeTaskStatus(
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  function changeFilter(todolistId: string, value: FilterValuesType) {
    let todolist = todoLists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todoLists]);
    }
  }

  let todoListsId1 = v1();
  let todoListsId2 = v1();

  let [todoLists, setTodolists] = useState<Array<TodoListType>>([
    { id: todoListsId1, title: "frontend", filter: "all" },
    { id: todoListsId2, title: "backend", filter: "all" },
  ]);

  let [tasksObj, setTasks] = useState({
    [todoListsId1]: [
      { id: v1(), title: "js", isDone: true },
      { id: v1(), title: "jsx", isDone: false },
      { id: v1(), title: "css", isDone: true },
    ],

    [todoListsId2]: [
      { id: v1(), title: "js", isDone: true },
      { id: v1(), title: "jsx", isDone: false },
      { id: v1(), title: "css", isDone: true },
    ],
  });

  function removeTodoList(todolistId: string) {
    let filteredTodolists = todoLists.filter((tl) => tl.id !== todolistId);
    setTodolists(filteredTodolists);
    delete tasksObj[todolistId];
  }

  return (
    <div className="App">
      {todoLists.map((tl) => {
        let tasksForlist = tasksObj[tl.id];
        if (tl.filter === "completed") {
          tasksForlist = tasksForlist.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForlist = tasksForlist.filter((t) => t.isDone === false);
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
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
