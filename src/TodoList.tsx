import React, { useState } from "react";
import { FilterValuesTypes } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>; // or TaskType[]
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesTypes) => void;
  addTask: (title: string) => void;
};

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  return (
    <div>
      <h2>{props.title}</h2>

      <input
        value={newTaskTitle}
        onChange={(e) => {
          setNewTaskTitle(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          props.addTask(newTaskTitle);
          setNewTaskTitle("");
        }}
      >
        +
      </button>
      <ul>
        {props.tasks.map((t, index) => {
          return (
            <li key={index}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>{" "}
              <button
                onClick={() => {
                  props.removeTask(t.id);
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
      <div>
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
    </div>
  );
}
