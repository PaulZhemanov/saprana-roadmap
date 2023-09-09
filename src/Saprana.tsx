import App from "./App";

export type TasksType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type PropsType = {
  title: string;
  tasks: Array<TasksType>;
};

function Saprana(props: PropsType) {
  return (
    <div>
      <h1>{props.title}</h1>
      <input />
      <button>Add</button>
      <ul>
        {props.tasks.map( t => 
          <li><input type="checkbox" checked={t.isDone} /><span>{t.title}</span>
            <button>Remove</button>
          </li>
        )}
      </ul>{" "}
    </div>
  );
}

export default Saprana;
