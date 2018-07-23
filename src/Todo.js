import React from "react";

const Todo = ({ name, click, id, done, clickDone }) => {
  return <li className={`done-${done}`}>
      <input type="checkbox" checked={done} className="mr-1" onClick={() => clickDone(id)} />
      {name}
      <button className="btn btn-outline-danger btn-sm ml-2" onClick={() => click(id)}>
        X
      </button>
    </li>;
};

export default Todo;
