import "./App.scss";
import classNames from "classnames";
import { useState } from "react";

// 父子组件通讯
// 1. 父 → 子（功能：渲染任务列表）
// 2. 子 → 父（功能：切换任务完成状态）
//  2.1 父组件准备修改状态的函数，并传递给子组件
//  2.2 子组件调用函数，并回传数据

//子组件
const Todo = ({ id, text, done, onToggle, onDelete }) => {
  return (
    <div className={classNames("todo", done && "todo-done")}>
      <div onClick={() => onToggle(id)}>{text}</div>
      <button onClick={() => onDelete(id)}>X</button>
    </div>
  );
};

//父组件
const App = () => {
  const defaultTodos = [
    { id: 1, text: "大傻屌", done: false },
    { id: 2, text: "哈哈", done: true },
    { id: 3, text: "西西", done: false },
  ];

  const [todos, setTodos] = useState(defaultTodos);

  const onToggle = (id) => {
    return setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done };
        }
        return item;
      })
    );
  };

  const onDelete = (id) => {
    return setTodos(todos.filter((item) => item.id != id));
  };

  return (
    <div className="app">
      <h3>代办任务列表:</h3>
      {todos.map((item) => {
        return (
          <Todo
            key={item.id}
            id={item.id}
            text={item.text}
            done={item.done}
            onToggle={onToggle}
            onDelete={onDelete}
          ></Todo>
        );
      })}
    </div>
  );
};

export default App;
