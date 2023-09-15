import { useState } from "react"
import "./App.css"
import Todolist, { TaskType } from "./Todolist"
import AddItemForm from "./AddItemForm"
import { v1 } from "uuid"

export type FilterValuesType = "all" | "completed" | "active"

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todoListsId1 = v1()
  let todoListsId2 = v1()

  let [todoLists, setTodolists] = useState<Array<TodoListType>>([
    { id: todoListsId1, title: "frontend", filter: "all" },
    { id: todoListsId2, title: "backend", filter: "all" },
  ])

  let [tasksObj, setTasks] = useState<TaskStateType>({
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
  })

  function removeTask(todolistId: string, id: string) {
    let tasks = tasksObj[todolistId]
    let filteredtasks = tasks.filter((t) => t.id !== id)
    tasksObj[todolistId] = filteredtasks
    setTasks({ ...tasksObj })
  }

  function addTodoList(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      filter: "all",
      title: title,
    }
    setTodolists([todolist, ...todoLists])
    setTasks({ ...tasksObj, [todolist.id]: [] })
  }

  function addTask(todolistId: string, title: string) {
    let task = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId]
    let newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj })
  }

  function changeTaskStatus(
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find((t) => t.id === taskId)
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
    let tasks = tasksObj[todolistId]
    let task = tasks.find((t) => t.id === taskId)
    if (task) {
      task.title = newTitle
      setTasks({ ...tasksObj })
    }
  }

  function changeFilter(todolistId: string, value: FilterValuesType) {
    let todolist = todoLists.find((tl) => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todoLists])
    }
  }

  function removeTodoList(todolistId: string) {
    let filteredTodolists = todoLists.filter((tl) => tl.id !== todolistId)
    setTodolists(filteredTodolists)
    delete tasksObj[todolistId]
  }
  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todoLists.find(tl => tl.id === id)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todoLists])
    }
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todoLists.map((tl) => {
        let tasksForlist = tasksObj[tl.id]
        if (tl.filter === "completed") {
          tasksForlist = tasksForlist.filter((t) => t.isDone === true)
        }
        if (tl.filter === "active") {
          tasksForlist = tasksForlist.filter((t) => t.isDone === false)
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForlist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            removeTodoList={removeTodoList}
            changeTodolistTitle={changeTodolistTitle}
          />
        )
      })}
    </div>
  )
}

export default App
