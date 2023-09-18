import { useState } from "react"
import "./App.css"
import Todolist, { TTask } from "./components/Todolist"
import AddItemForm from "./components/AddItemForm"
import { Paper } from "@material-ui/core"

export type TFilterValues = "all" | "completed" | "active"

type TTodoList = {
  id: string
  title: string
  filter: TFilterValues
}

type TTaskState = Record<string, Array<TTask>>

function App() {
  const todoListsId1 = Math.random().toString()
  const todoListsId2 = Math.random().toString()

  let [todoLists, setTodolists] = useState<Array<TTodoList>>([
    { id: todoListsId1, title: "frontend", filter: "all" },
    { id: todoListsId2, title: "backend", filter: "all" },
  ])

let [tasksObj, setTasks] = useState<TTaskState>(
  todoLists.reduce((acc, list) => {
    const tasks: TTask[] = [
      { id: Math.random().toString(16), title: "js", isDone: true },
      { id: Math.random().toString(16), title: "jsx", isDone: false },
      { id: Math.random().toString(16), title: "css", isDone: true },
    ]
    acc[list.id] = tasks
    return acc
  }, {} as  TTaskState )
)

  // let [tasksObj, setTasks] = useState<TTaskState>({
  //   [todoListsId1]: [
  //     { id: Math.random().toString(16), title: "js", isDone: true },
  //     { id: Math.random().toString(16), title: "jsx", isDone: false },
  //     { id: Math.random().toString(16), title: "css", isDone: true },
  //   ],

  //   [todoListsId2]: [
  //     { id: Math.random().toString(16), title: "js", isDone: true },
  //     { id: Math.random().toString(16), title: "jsx", isDone: false },
  //     { id: Math.random().toString(16), title: "css", isDone: true },
  //   ],
  // })

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
    const tasks = tasksObj[todolistId]
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj })
    }
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    const tasks = tasksObj[todolistId]
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      task.title = newTitle
      setTasks({ ...tasksObj })
    }
  }

  function changeFilter(todolistId: string, value: TFilterValues) {
    const todolist = todoLists.find((tl) => tl.id === todolistId)
    if (todolist) {
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
      {todoLists.map((tl) => {
        let tasksForlist = tasksObj[tl.id]
        if (tl.filter === "completed") {
          tasksForlist = tasksForlist.filter((t) => t.isDone === true)
        }
        if (tl.filter === "active") {
          tasksForlist = tasksForlist.filter((t) => t.isDone === false)
        }

        return (
          <Paper elevation={24} variant="outlined">
            <Todolist
              {...tl}
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
