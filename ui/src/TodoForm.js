import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoForm extends Component {
  static propTypes = {
    addTask: PropTypes.func.isRequired,
    handleInput: PropTypes.func.isRequired,
    currentTask: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      createdDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  };

  componentDidUpdate() {
    this.inputElement.current.focus();
  }

  inputElement = React.createRef();

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.props.addTask}>
            <input
              placeholder="Task"
              ref={this.inputElement}
              value={this.props.currentTask.name}
              onChange={this.props.handleInput}
            />
            <button type="submit"> Add Task </button>
          </form>
        </div>
      </div>
    );
  }
}

export default TodoForm;
