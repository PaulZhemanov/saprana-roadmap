import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TodoList />
      <TodoList />
      <TodoList />
    </div>
  );
}

function TodoList() {
  return (
    <div>
      <h1>what to learn</h1>

      <input />
      <button>+</button>
      <ul>
        <li><input type="checkbox" checked={true}/><span>css</span></li>
        <li><input type="checkbox" checked={true}/><span>js</span></li>
        <li><input type="checkbox" checked={false}/><span>react</span></li>
      </ul>
    </div>
  );
}
export default App;
