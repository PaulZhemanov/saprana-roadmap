import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (todolistId: string, value: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

export function Saprana(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    } else {
      setError("Field is required");
    }
  };
  const onAllClickHandler = () => {
    props.changeFilter(props.id, "all");
  };
  const onActiveClickHandler = () => {
    props.changeFilter(props.id, "active");
  };
  const onCompletedClickHandler = () => {
    props.changeFilter(props.id, "completed");
  };

  return (
    <div>
      <h1>{props.title}</h1>
      <input
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>Add</button>
      {error && <div className="error-message">{error}</div>}

      <ul>
        {props.tasks.map((t) => {
          const removeTask = () => props.removeTask(t.id);

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked);

          return (
            <li key={t.id}>
              <input
                className={t.isDone ? "is-done" : ""}
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeHandler}
              />
              <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
              <button onClick={removeTask}>Remove</button>
            </li>
          );
        })}
      </ul>
      <button
        className={props.filter === "all" ? "active-filter" : ""}
        onClick={onAllClickHandler}
      >
        All
      </button>
      <button
        className={props.filter === "active" ? "active-filter" : ""}
        onClick={onActiveClickHandler}
      >
        Active
      </button>
      <button
        className={props.filter === "completed" ? "active-filter" : ""}
        onClick={onCompletedClickHandler}
      >
        Completed
      </button>
    </div>
  );
}

export default Saprana;
