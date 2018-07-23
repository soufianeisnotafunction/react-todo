import React from "react";

const Todo = ({ name, click, id, done, clickDone }) => {
  return <li className='mr-4 done-{done}'>
      <input type="checkbox" className="mr-1" onClick={() => clickDone(id)} />
      {name}
      <button className="btn btn-outline-danger btn-sm ml-2" onClick={() => (id)}>
        X
      </button>
    </li>;
};

export default Todo;
