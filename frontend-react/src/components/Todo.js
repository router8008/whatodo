import React, {Component} from 'react';

import Header from './Header';
import TodoList from './TodoList'
// import 

class Todo extends Component {
  render() {
    return (
      <div className="container">
        <Header/>
        <TodoList/>
      </div>
    );
  }
}

export default Todo;