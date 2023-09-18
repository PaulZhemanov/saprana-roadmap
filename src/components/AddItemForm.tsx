import { Button, TextField } from "@material-ui/core"
import { ChangeEvent, useState, KeyboardEvent } from "react"

interface IAddItemForm {
  onAddItem: (title: string) => void
}

function AddItemForm({ onAddItem }: IAddItemForm) {
  const [newItemTitle, setNewItemTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const AddItem = () => {
    if (newItemTitle.trim() !== "") {
      onAddItem(newItemTitle)
      setNewItemTitle("")
    } else {
      setError("Field is required")
    }
  }
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItemTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      onAddItem(newItemTitle)
      setNewItemTitle("")
    }
  }
  return (
    <div>
      <TextField
        value={newItemTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        variant="outlined"
        label={"Type Your Shit"}
        helperText={error}
        size="small"
      />
      <Button onClick={AddItem} variant="contained" color="primary">
        Add
      </Button>
    </div>
  )
}

export default AddItemForm
