import { ChangeEvent } from "react"
import { FilterValuesType } from "./App"
import AddItemForm from "./AddItemForm"
import EditableSpan from "./EditableSpan"
import { Button, Checkbox, IconButton }  from "@material-ui/core"
import { Delete } from "@material-ui/icons"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTodoList: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
  removeTask: (todolistId: string, id: string) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void
}

function Todolist(props: PropsType) {
  const onAllClickHandler = () => {
    props.changeFilter(props.id, "all")
  }
  const onActiveClickHandler = () => {
    props.changeFilter(props.id, "active")
  }
  const onCompletedClickHandler = () => {
    props.changeFilter(props.id, "completed")
  }

  const removeTodoList = () => {
    props.removeTodoList(props.id)
  }

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }

  const addTask = (title: string) => {
    props.addTask(props.id, title)
  }
  return (
    <div>
      <h1>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />

        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h1>

      <AddItemForm addItem={addTask} />

      <ul>
        {props.tasks.map((t) => {
          const removeTask = () => props.removeTask(props.id, t.id)

          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)

          const onChangeTitleHandler = (newValue: string) =>
            props.changeTaskTitle(t.id, newValue, props.id)

          return (
            <li key={t.id}>
              <Checkbox
                checked={t.isDone}
                onChange={onChangeStatusHandler}
                size="small"
              />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />

              <Button onClick={removeTask} >
                <Delete />
              </Button>
            </li>
          )
        })}
      </ul>
      <Button
        variant={props.filter === "all" ? "contained" : "text"}
        onClick={onAllClickHandler}
        size="small"
      >
        All
      </Button>
      <Button
        variant={props.filter === "active" ? "contained" : "text"}
        onClick={onActiveClickHandler}
        color="primary"
        size="small"
      >
        Active
      </Button>
      <Button
        variant={props.filter === "completed" ? "contained" : "text"}
        onClick={onCompletedClickHandler}
        color="secondary"
        size="small"
      >
        Completed
      </Button>
    </div>
  )
}

export default Todolist
