import React, { Component } from 'react';
import PropTypes from 'prop-types';


class TodoTasks extends Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    deleteTask: PropTypes.func.isRequired,
  };

  createTaskEntry = task => (
    <li
      key={task._id}
      onClick={() => this.props.deleteTask(task._id)}
    >
      {task.name}
    </li>
  );

  render() {
    const tasks = this.props.tasks;
    const listTasks = tasks.map(this.createTaskEntry);

    return <ul className="theList">{listTasks}</ul>;
  }
}


export default TodoTasks;
