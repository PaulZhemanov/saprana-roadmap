import App from "./App"


export type TasksType = {
  id: number
  title: string
  isDone: boolean
}


export type PropsType = {
  title: string;
  tasks: Array<TasksType>
};

function Saprana(props: PropsType) {

  return (
    <div>
      <h1>{props.title}</h1>
      <input />
      <button>Add</button>
      <ul>
        <li><input type="checkbox" checked= {props.tasks[0].isDone} /><span>{props.tasks[0].title}</span><button>Remove</button></li>
        <li><input type="checkbox" checked= {props.tasks[1].isDone} /><span>{props.tasks[1].title}</span><button>Remove</button></li>
        <li><input type="checkbox" checked= {props.tasks[2].isDone} /><span>{props.tasks[1].title}</span><button>Remove</button></li>
      </ul>{" "}
     
    </div>
  );
}

export default Saprana