import { ChangeEvent } from "react"
import { TFilterValues } from "./App"
import AddItemForm from "./AddItemForm"
import EditableSpan from "./EditableSpan"
import { Button, Checkbox, IconButton } from "@material-ui/core"
import { Delete } from "@material-ui/icons"

export type TTask = {
  id: string
  title: string
  isDone: boolean
}

type TProps = {
  id: string
  title: string
  tasks: Array<TTask>
  filter: TFilterValues
  changeFilter: (todolistId: string, value: TFilterValues) => void
  onChangeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void
  onChangeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void
  onRemoveTodoList: (todolistId: string) => void
  onChangeTodolistTitle: (todolistId: string, newTitle: string) => void
  onRemoveTask: (todolistId: string, id: string) => void
  onAddTask: (todolistId: string, title: string) => void
}

function Todolist(props: TProps) {
  const onAllClickHandler = () => {
    props.changeFilter(props.id, "all")
  }
  const onActiveClickHandler = () => {
    props.changeFilter(props.id, "active")
  }
  const onCompletedClickHandler = () => {
    props.changeFilter(props.id, "completed")
  }

  const onRemoveTodoList = () => {
    props.onRemoveTodoList(props.id)
  }

  const onChangeTodolistTitle = (newTitle: string) => {
    props.onChangeTodolistTitle(props.id, newTitle)
  }

  const onAddTask = (title: string) => {
    props.onAddTask(props.id, title)
  }
  return (
    <div>
      <h1>
        <EditableSpan title={props.title} onChange={onChangeTodolistTitle} />

        <IconButton onClick={onRemoveTodoList}>
          <Delete />
        </IconButton>
      </h1>

      <AddItemForm onAddItem={onAddTask} />

      <ul>
        {props.tasks.map((t) => {
          const onRemoveTask = () => props.onRemoveTask(props.id, t.id)

          const onChangeTaskStatusHandler = (
            e: ChangeEvent<HTMLInputElement>
          ) => props.onChangeTaskStatus(props.id, t.id, e.currentTarget.checked)

          const onChangeTaskTitleHandler = (newValue: string) =>
            props.onChangeTaskTitle(t.id, newValue, props.id)

          return (
            <li key={t.id}>
              <Checkbox
                checked={t.isDone}
                onChange={onChangeTaskStatusHandler}
                size="small"
              />
              <EditableSpan
                title={t.title}
                onChange={onChangeTaskTitleHandler}
              />

              <Button onClick={onRemoveTask}>
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
