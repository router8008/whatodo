import React, {Component} from 'react';
import jQuery from 'jquery';

import EditForm from './EditForm'

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: this.props.editing,
      hiding: false
    };

    this.handleCancel = this.handleCancel.bind(this);

  }

  handleDel() {
    jQuery.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/items/deleteitem/',
      data: {
        id: this.props.id
      },
      success: () => {
        this.setState({
          hiding: true
        });
      }
    });
  }

  handleCheck() {
    jQuery.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/items/checkitem/',
      data: {
        id: this.props.id
      },
      success: () => {
        this.setState({
          hiding: true
        });
      }
    });
  }

  handleEdit() {
    this.setState({
      editing: true
    });
  }

  handleCancel() {
    if (!this.props.id)
      this.props.onCloseNew();
    this.setState({
      editing: false
    });
  }

  getPanelStyle(urgency) {
    if (urgency === "vital")
      return "panel-danger";
    else if (urgency === "important")
      return "panel-warning";
    else if (urgency === "normal")
      return "panel-info";
    else if (urgency === "finished")
      return "panel-success";
  };


  render() {
    if (this.state.hiding)
      return null;
    return (
      <div className={"panel " + this.getPanelStyle(this.props.urgency)}>
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body">

          {!this.state.editing &&
          (<div className="content-body">
            <div className="panel-content">{this.props.content}</div>
            <p className="text-muted" id="modified_time"><br/>
              Last Modified: {this.props.lastModifiedTime}
            </p>
            <button className="btn btn-danger" style={{float: 'right', margin: '0 5px'}}
                    onClick={() => this.handleDel()}>Delete
            </button>
            <button className="btn btn-info" style={{float: 'right', margin: '0 5px'}}
                    onClick={() => this.handleEdit()}>Edit
            </button>
            {this.props.onTodoPage &&
            <button className="btn btn-success" style={{float: 'right', margin: '0 5px'}}
                    onClick={() => this.handleCheck()}>Check
            </button>
            }
          </div>)
          }

          {this.state.editing &&
          <EditForm
            id={this.props.id}
            title={this.props.title}
            content={this.props.content}
            urgency={this.props.urgency}
            handleCancel={this.handleCancel}
            updateItemList={() => this.props.updateItemList()}
          />
          }

        </div>
      </div>
    );
  }
}

export default TodoItem;