import React, {Component} from 'react';

import Header from './Header';
import TodoList from './TodoList'

class Completed extends Component {
  render() {
    return (
      <div className="container">
        <Header onTodoPage={false}/>
        <TodoList onTodoPage={false}/>
      </div>
    );
  }
}

export default Completed;