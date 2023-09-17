import { TextField } from "@material-ui/core"
import { ChangeEvent, useState } from "react"

type TEditableSpanProps = {
  title: string
  onChange: (newValue: string) => void
}
type TEditMode = false | true

function EditableSpan(props: TEditableSpanProps) {
  let [editMode, setEditMode] = useState<TEditMode>(false)
  let [title, setTitle] = useState("")

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }

  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value)

  return editMode ? (
    <TextField
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}

export default EditableSpan