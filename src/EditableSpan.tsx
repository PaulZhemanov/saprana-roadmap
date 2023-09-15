import { TextField } from "@material-ui/core"
import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
  title: string
  onChange: (newValue: string) => void
}
type EditModeType = false | true

function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState<EditModeType>(false)
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
