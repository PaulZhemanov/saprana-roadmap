import { ChangeEvent, useState, KeyboardEvent } from "react";

type AddItemFormType = {
  addItem: (title: string) => void;
};

function AddItemForm(props: AddItemFormType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle);
      setNewTaskTitle("");
    } else {
      setError("Field is required");
    }
  };
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      props.addItem(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  return (
    <div>
      <input
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>Add</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default AddItemForm;
