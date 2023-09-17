import { Button, TextField } from "@material-ui/core"
import { ChangeEvent, useState, KeyboardEvent } from "react"

type TAddItemForm = {
  onAddItem: (title: string) => void
}

function AddItemForm(props: TAddItemForm) {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onAddItem = () => {
    if (newTaskTitle.trim() !== "") {
      props.onAddItem(newTaskTitle)
      setNewTaskTitle("")
    } else {
      setError("Field is required")
    }
  }
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      props.onAddItem(newTaskTitle)
      setNewTaskTitle("")
    }
  }
  return (
    <div>
      <TextField
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        variant="outlined"
        label={"Type Your Shit"}
        helperText={error}
        size="small"
      />
      <Button onClick={onAddItem} variant="contained" color="primary">
        Add
      </Button>
    </div>
  )
}

export default AddItemForm
