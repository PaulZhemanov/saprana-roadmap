import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTodoList: (todolistId: string) => void;
  removeTask: (todolistId: string, id: string) => void;
  changeFilter: (todolistId: string, value: FilterValuesType) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
};

export function Todolist(props: PropsType) {
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
  const onAllClickHandler = () => {
    props.changeFilter(props.id, "all");
  };
  const onActiveClickHandler = () => {
    props.changeFilter(props.id, "active");
  };
  const onCompletedClickHandler = () => {
    props.changeFilter(props.id, "completed");
  };

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  return (
    <div>
      <h1>
        {props.title} <button onClick={removeTodoList}>Remove</button>
      </h1>
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
     

      <ul>
        {props.tasks.map((t) => {
          const removeTask = () => props.removeTask(props.id, t.id);

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);

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

export default Todolist;

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