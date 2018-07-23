import React, {
  Component
} from "react";
import Header from "./Header";
import Todo from "./Todo";
import db from './firebase'
import './App.css'



class App extends Component {
  constructor(props) {
    super(props)
    this.dbRef = db.collection('todos')
  }

  state = {
    todos: [],
    inputvalue: ""
  };

  getRealTimeData = () => {
    this.dbRef.orderBy('name').onSnapshot(snapshot => {
      let changes = snapshot.docChanges()
      changes.forEach(change => {
        let dataObj = {
          id: change.doc.id,
          name: change.doc.data().name,
          done: change.doc.data().done
        };
        if (change.type === 'added') {
          this.setState({
            todos : [dataObj, ...this.state.todos]
          });

        } else if (change.type === 'removed') {
          this.setState({todos:this.state.todos.filter(todo=> todo.id !== change.doc.id)})
        } else if (change.type === 'modified') {
          let updated = [dataObj, ...this.state.todos.filter(todo => todo.id !== change.doc.id)]
          this.setState({todos : updated})
          
        }

      });
     
    });
  }
  componentDidMount() {
    this.getRealTimeData();
  }


  

  addTodohandler = () => {
    this.dbRef.add({
        name: this.state.inputvalue,
        done: false,
      })
      .then(() => console.log('data added to firestore'))
    this.setState({
      inputvalue: ''
    })

  };

  inputChangeHandler = e => {
    this.setState({
      inputvalue: e.target.value
    });
  };

  deleteTodoHandler = id => {
    return this.dbRef.doc(id).delete()
  };

  taskDoneHandler = id => {
    this.dbRef.doc(id).get()
      .then(doc => {
      this.dbRef.doc(id).update({
        done: !doc.data().done
      }).then(() => console.log('updated' , id))
    })
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
    return <div className="App container">
        <Header />
        <input type="text" value={this.state.inputvalue} className="mb-4" onChange={this.inputChangeHandler} />
        <button type="submit" className="btn btn-outline-success btn-sm" onClick={this.addTodohandler}>
          Add new Todo
        </button>
        <ul>{renderTodos}</ul>
      </div>;
  }
}

export default App;
