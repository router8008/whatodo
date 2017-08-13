import React, {Component} from 'react';
import jQuery from 'jquery';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      content: this.props.content,
      urgency: this.props.urgency,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleUrgencyChange = this.handleUrgencyChange.bind(this);

  }

  update() {
    if (!this.props.id)
      jQuery.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/items/additem/',
        data: {
          title: this.state.title,
          content: this.state.content,
          urgency: this.state.urgency,
        },
        success: () => {
          this.setState({
            editing: false
          });
          this.props.handleCancel();
          this.props.updateItemList();
        }
      });
    else
      jQuery.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8000/items/changeitem/',
        data: {
          id: this.props.id,
          title: this.state.title,
          content: this.state.content,
          urgency: this.state.urgency,
        },
        success: () => {
          this.setState({
            editing: false
          });
          this.props.updateItemList();
          this.props.handleCancel();
        }
      });
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  handleUrgencyChange(event) {
    this.setState({urgency: event.target.value});
  }

  render() {
    return (
      <form className="form-horizontal">
        <fieldset>
          <div className="form-group" id="title_group">
            <label className="col-lg-2 control-label">Title</label>
            <div className="col-lg-10">
              <input type="text" className="form-control" placeholder="Title"
                     value={this.state.title} onChange={this.handleTitleChange}/>
              {!this.state.title &&
              <label className="control-label" id="warning">
                title can not be empty
              </label>
              }
            </div>
          </div>
          <div className="form-group" id="content_group">
            <label htmlFor="textArea" className="col-lg-2 control-label">Content</label>
            <div className="col-lg-10">
              <textarea className="form-control" rows="3" placeholder="Content"
                        value={this.state.content} onChange={this.handleContentChange}/>
            </div>
          </div>
          <div className="form-group"><label htmlFor="select" className="col-lg-2 control-label">Urgency</label>
            <div className="col-lg-10">
              <select className="form-control" value={this.state.urgency} onChange={this.handleUrgencyChange}>
                <option value="normal">normal</option>
                <option value="important">important</option>
                <option value="vital">vital</option>
              </select></div>
          </div>
          <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button type="button" className="btn btn-default" onClick={this.props.handleCancel}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={() => this.update()}>Save</button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default EditForm;
