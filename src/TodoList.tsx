import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesTypes } from "./App";
import { title } from "process";
import { errors } from "web3";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>; // or TaskType[]
  removeTask: (id: string) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  changeFilter: (value: FilterValuesTypes) => void;
};

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("")
    } 
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
    
  };

  const onAllChangeHandler = () => props.changeFilter("all");
  const onActiveChangeHandler = () => props.changeFilter("active");
  const onComplitedChangeHandler = () => props.changeFilter("completed");

  return (
    <div>
      <h2>{props.title}</h2>

      <input
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? "error": ""}
      />
      <button onClick={addTask}>+</button>
     {error && <div className="error-message">{error}</div>}
      <ul>
        {props.tasks.map((t, index) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id);
          };

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked);
            console.log(t.id + e.currentTarget.checked);
          };

          return (
            <li key={index}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>{" "}
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllChangeHandler}>All</button>
        <button onClick={onActiveChangeHandler}>Active</button>
        <button onClick={onComplitedChangeHandler}>Completed</button>
      </div>
    </div>
  );
}