import {useState} from "react"
import "./App.css"
import AddItemForm from "./components/AddItemForm"
import {Button, Checkbox, IconButton, Paper} from "@material-ui/core"
import EditableSpan from "./components/EditableSpan"
import { Delete } from "@material-ui/icons"

export type TFilterValues = "all" | "completed" | "active"

type TTodoList = {
  id: string
  title: string
  filter: TFilterValues
}
type TTask = {
  id: string
  title: string
  isDone: boolean
}

/*
*
store = {
  todoLists: TTodoList[] = []
}

type TTodoList = {
  id: string
  title: string
  filter: TFilterValues
  tasks: Array<TTask>
}
*
*
*
store = {
  todoLists: TTodoList[] = [],
  tasks: TTask = Array<TTask>
}
type TTotoList{
  id: string
  title: string
  filter: TFilterValues
}

type TTask = {
  id: string
  title: string
  isDone: boolean
  todoListId: string
}

*
* */

type TTaskState = Record<string, Array<TTask>>

const App = () => {

  let [todoLists, setTodolists] = useState<Array<TTodoList>>([
    { id: Math.random().toString(), title: "frontend", filter: "all" },
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
       {todoLists.map((tl) => {
         let tasksForList = tasksObj[tl.id]
         if (tl.filter === "completed")
           tasksForList = tasksForList.filter((t) => t.isDone)
         if (tl.filter === "active")
           tasksForList = tasksForList.filter((t) => !t.isDone)

         return (
           <Paper elevation={24} variant="outlined" key={tl.id}>
             <h1>
               <EditableSpan
                 title={tl.title}
                 onChange={(newTitle) => changeTodolistTitle(tl.id, newTitle)}
               />
               <IconButton onClick={() => removeTodoList(tl.id)}>
                 <Delete />
               </IconButton>
             </h1>

             <AddItemForm onAddItem={(title) => addTask(tl.id, title)} />

             <ul>
               {tasksForList.map((t) => (
                 <li key={t.id}>
                   <Checkbox
                     checked={t.isDone}
                     onChange={(e) =>
                       changeTaskStatus(tl.id, t.id, e.currentTarget.checked)
                     }
                     size="small"
                   />
                   <EditableSpan
                     title={t.title}
                     onChange={(newTitle) =>
                       changeTaskTitle(t.id, newTitle, tl.id)
                     }
                   />
                   <Button onClick={() => removeTask(tl.id, t.id)}>
                     <Delete />
                   </Button>
                 </li>
               ))}
             </ul>
             <Button
               variant={tl.filter === "all" ? "contained" : "text"}
               onClick={() => changeFilter(tl.id, "all")}
               size="small"
             >
               All
             </Button>
             <Button
               variant={tl.filter === "active" ? "contained" : "text"}
               onClick={() => changeFilter(tl.id, "active")}
               color="primary"
               size="small"
             >
               Active
             </Button>
             <Button
               variant={tl.filter === "completed" ? "contained" : "text"}
               onClick={() => changeFilter(tl.id, "completed")}
               color="secondary"
               size="small"
             >
               Completed
             </Button>
           </Paper>
         )
       })}
     </div>
   )
}

export default App
