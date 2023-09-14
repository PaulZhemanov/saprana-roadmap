import { ChangeEvent, useState, KeyboardEvent } from "react";

type AddItemFormType = {
  id: string;
  addTask: (todolistId: string, title: string) => void;
};

function AddItemForm(props: AddItemFormType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(props.id, newTaskTitle);
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
      props.addTask(props.id, newTaskTitle);
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
