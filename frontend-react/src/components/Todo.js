import React, {Component} from 'react';

import Header from './Header';
import TodoList from './TodoList'

class Todo extends Component {
  render() {
    return (
      <div className="container">
        <Header onTodoPage={true}/>
        <TodoList
          onTodoPage={true}
        />
      </div>
    );
  }
}

export default Todo;