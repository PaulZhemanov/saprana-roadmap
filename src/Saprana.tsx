import { useState } from "react";
import App from "./App";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void
};


function Saprana(props: PropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("");

  return (
    <div>
      <h1>{props.title}</h1>
      <input
        value={newTaskTitle}
        onChange={(e) => { setNewTaskTitle(e.currentTarget.value) }}
      />
      <button onClick={() => props.addTask(newTaskTitle)}>Add</button>
      <ul>
        {props.tasks.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <button
              onClick={() => {
                props.removeTask(t.id);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          props.changeFilter("all");
        }}
      >
        All
      </button>
      <button
        onClick={() => {
          props.changeFilter("active");
        }}
      >
        Active
      </button>
      <button
        onClick={() => {
          props.changeFilter("completed");
        }}
      >
        Completed
      </button>
    </div>
  );
}

export default Saprana;
