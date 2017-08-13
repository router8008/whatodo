import React, {Component} from 'react';
import jQuery from 'jquery';
import {hashHistory} from 'react-router';

import TodoItem from './TodoItem'

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: []
    };
  }

  update() {
    jQuery.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8000/items/itemlist',
      success: (result) => {
        this.setState({
          todolist: result
        });
      }
    });
  }

  componentDidMount() {
    // if (!Cookies.get('token')) {
    //   hashHistory.push('/login');
    // }
    this.update();
  }

  render() {
    return (
      <div className="todoItems">
        {
          this.state.todolist.map((item) => {
            return (
              <TodoItem
                id={item.id}
                key={item.id}
                title={item.title}
                content={item.content}
                lastModifiedTime={item.last_modified_time}
                urgency={item.urgency}
                editing={false}
                updateItemList={() => this.update()}
              />
            );
          })
        }
      </div>
    );
  }
}

export default TodoList;