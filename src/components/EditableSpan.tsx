import { TextField } from "@material-ui/core"
import { ChangeEvent, useState, KeyboardEvent } from "react"

interface IProps {
  title: string
  onChange: (newValue: string) => void
}

type TEditMode = false | true

function EditableSpan({title, onChange }: IProps) {
  let [editMode, setEditMode] = useState<TEditMode>(false)
  let [newTitle, setNewTitle] = useState("")

  const onActivateEditMode = () => {
    setEditMode(true)
    setNewTitle(title)
  }

  const onActivateViewMode = () => {
    if (newTitle.trim() !== "") {
      setEditMode(false)
    }
    onChange(newTitle)
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTitle(e.currentTarget.value)

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
     e.key === "Enter" && onActivateViewMode()
   }

   //todo всегда возвращай рутовый компонент
  return editMode ? (
    <TextField
      value={newTitle}
      onChange={onChangeTitleHandler}
      onBlur={onActivateViewMode}
      onKeyDown={onKeyPressHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={onActivateEditMode}>{title}</span>
  )
}

export default EditableSpan
