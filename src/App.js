import React, { Component } from "react";
import uuid from "uuid/v1";
import "./App.css";
import Header from "./Header";
import Todo from "./Todo";

class App extends Component {
  state = {
    todos: [],
    inputvalue: ""
  };

  addTodohandler = () => {
    this.setState({
      todos: [
        {
          name: this.state.inputvalue,
          done: false,
          id: uuid()
        },
        ...this.state.todos
      ],
      inputvalue: ""
    });
  };

  inputChangeHandler = e => {
    this.setState({
      inputvalue: e.target.value
    });
  };

  deleteTodoHandler = id => {
    this.setState({
      todos: this.state.todos.filter(x => x.id !== id)
    });
  };
  taskDoneHandler = id => {
    const index = this.state.todos.findIndex(x => x.id === id);
    let todos = this.state.todos;
    todos[index].done = !todos[index].done;
    this.setState({
      todos
    });
  };
  render() {
    const renderTodos = this.state.todos.map(todo => (
      <Todo
        key={todo.id}
        name={todo.name}
        id={todo.id}
        done={todo.done}
        click={this.deleteTodoHandler}
        clickDone={this.taskDoneHandler}
      />
    ));
    return (
      <div className="App">
        <Header />
        <input
          type="text"
          value={this.state.inputvalue}
          className='mb-4'
          onChange={this.inputChangeHandler}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          onClick={this.addTodohandler}
        >
          Add new Todo
        </button>
        <ul>{renderTodos}</ul>
      </div>
    );
  }
}

export default App;
