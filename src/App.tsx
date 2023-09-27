import {useState} from "react"
import "./App.css"
import AddItemForm from "./components/AddItemForm"
import { Paper } from "@material-ui/core"
import Todolist from "./components/Todolist"
import { TTask } from "./components/Todolist"

export type TFilterValues = "all" | "completed" | "active"

type TTodoList = {
  id: string
  title: string
  filter: TFilterValues
}


type TTaskState = Record<string, Array<TTask>>

const App = () => {

  let [todoLists, setTodolists] = useState<Array<TTodoList>>([
    { id: Math.random().toString(), title: "frontend", filter: "all" },
    { id: Math.random().toString(), title: "backend", filter: "all" },
    { id: Math.random().toString(), title: "backend", filter: "all" },
    { id: Math.random().toString(), title: "backend", filter: "all" },
    { id: Math.random().toString(), title: "backend", filter: "all" },
  ])

let [tasksObj, setTasks] = useState<TTaskState>(
  todoLists.reduce((acc, list) => {
    acc[list.id] = [
      {id: Math.random().toString(16), title: "js", isDone: true},
      {id: Math.random().toString(16), title: "jsx", isDone: false},
      {id: Math.random().toString(16), title: "css", isDone: true},
    ]
    return acc
  }, {} as  TTaskState )
)

  function removeTask(todolistId: string, id: string) {
    const tasks = tasksObj[todolistId]
    const filteredtasks = tasks.filter((t) => t.id !== id)
    tasksObj[todolistId] = filteredtasks
    setTasks({ ...tasksObj })
  }

  function addTodoList(title: string) {
    const todolist: TTodoList = {
      id: Math.random().toString(),
      filter: "all",
      title: title,
    }
    setTodolists([todolist, ...todoLists])
    setTasks({ ...tasksObj, [todolist.id]: [] })
  }

  function addTask(todolistId: string, title: string) {
    const task = { id: Math.random().toString(16), title: title, isDone: false }
    const tasks = tasksObj[todolistId]
    const newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj })
  }

  function changeTaskStatus(
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) {
    const task = tasksObj[todolistId].find((t) => t.id === taskId)
    if (task != null) {
      task.isDone = isDone
      setTasks({ ...tasksObj })
    }
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    const task = tasksObj[todolistId].find((t) => t.id === taskId)
    if (task != null) {
      task.title = newTitle
      setTasks({ ...tasksObj })
    }
  }

  function changeFilter(todolistId: string, value: TFilterValues) {
    const todolist = todoLists.find((tl) => tl.id === todolistId)
    if (todolist != null) {
      todolist.filter = value
      setTodolists([...todoLists])
    }
  }

  function removeTodoList(todolistId: string) {
    const filteredTodolists = todoLists.filter((tl) => tl.id !== todolistId)
    setTodolists(filteredTodolists)
    delete tasksObj[todolistId]
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todoLists.find((tl) => tl.id === id)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todoLists])
    }
  }

  return (
    <div className="App">
      <AddItemForm onAddItem={addTodoList} />
      {/*Старайся делать так  {todoList.map(tl => <Component....)}*/}
      {todoLists.map((tl) => {
        let tasksForlist = tasksObj[tl.id];
        if (tl.filter === "completed") tasksForlist = tasksForlist.filter((t) => t.isDone);
        if (tl.filter === "active") tasksForlist = tasksForlist.filter((t) => !t.isDone);


        return (
          <Paper elevation={24} variant="outlined">
            {/*избавься от todolist*/}
            <Todolist
              {...tl}
              key={tl.id}
              tasks={tasksForlist}
              changeFilter={changeFilter}
              onChangeTaskStatus={changeTaskStatus}
              onChangeTaskTitle={changeTaskTitle}
              onRemoveTodoList={removeTodoList}
              onChangeTodolistTitle={changeTodolistTitle}
              onRemoveTask={removeTask}
              onAddTask={addTask}
            />
          </Paper>
        )
      })}
    </div>
  )
}

export default App
