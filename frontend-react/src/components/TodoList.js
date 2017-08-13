import React, {Component} from 'react';
import jQuery from 'jquery';
import {hashHistory} from 'react-router';

import TodoItem from './TodoItem'

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: [],
      adding: false,
    };
  }

  update(urgency_filter = "all", order_by = "latest_first") {
    if (!this.props.onTodoPage)
      urgency_filter = "finished";
    jQuery.ajax({
      type: 'GET',
      url: 'http://127.0.0.1:8000/items/itemlist/?order_by=' + order_by + "&urgency_filter=" + urgency_filter,
      success: (result) => {
        this.setState({
          todolist: result
        });
      }
    });
  }

  handleNew() {
    this.setState({
      adding: true
    });
  }

  handleCloseNew() {
    this.setState({
      adding: false
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
      <div>
        {
          this.props.onTodoPage &&
          <div className="row">
            <div className="btn-toolbar">
              <div className="btn-group">
                <button className="btn btn-success" onClick={() => this.handleNew()}>New</button>
              </div>

              <div className="btn-group">
                <a className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  Order By
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a onClick={() => this.update("all", "latest_first")}>Latest First</a></li>
                  <li><a onClick={() => this.update("all", "oldest_first")}>Oldest First</a></li>
                  <li><a onClick={() => this.update("all", "most_important")}>Most Important</a></li>
                  <li><a onClick={() => this.update("all", "least_important")}>Least Important</a></li>
                </ul>
              </div>

              <div className="btn-group">
                <a className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  Urgency Filter
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a onClick={() => this.update("all")}>All</a></li>
                  <li><a onClick={() => this.update("vital")}>Vital</a></li>
                  <li><a onClick={() => this.update("important")}>Important</a></li>
                  <li><a onClick={() => this.update("normal")}>Normal</a></li>
                </ul>
              </div>
            </div>
            <br/>
          </div>
        }

        <div className="todoItems">
          {
            this.state.adding &&
            <TodoItem
              id={null}
              title="Title"
              content=""
              urgency="normal"
              editing={true}
              onTodoPage={this.props.onTodoPage}
              updateItemList={() => this.update()}
              onCloseNew={() => this.handleCloseNew()}
            />
          }
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
                  onTodoPage={this.props.onTodoPage}
                  updateItemList={() => this.update()}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default TodoList;