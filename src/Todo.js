import React from "react";

const Todo = ({ name, click, id, done, clickDone }) => {
  return (
    <li className={`done-${done}`}>
      {name}
      <button onClick={() => click(id)}>X</button>
      <button onClick={() => clickDone(id)}>Done</button>
    </li>
  );
};

export default Todo;
