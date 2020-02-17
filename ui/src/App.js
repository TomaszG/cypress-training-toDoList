import React, { Component } from 'react';

import routes from './routes';
import TodoForm from './TodoForm';
import TodoTasks from './TodoTasks';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      currentTask: {
        _id: '',
        name: '',
        status: '',
        createdDate: '',
      },
      error: '',
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  handleInput = e => {
    const taskName = e.target.value;
    const currentTask = {
      name: taskName,
      status: 'pending',
      createdDate: Date.now(),
    };
    this.setState({
      currentTask,
      error: '',
    });
  };

  fetchTasks = async () => {
    const response = await fetch(routes.tasks.list());
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    this.setState({
      tasks: body,
      error: '',
    });
  };

  clearCurrentTask = () => {
    this.setState({
      currentTask: {
        _id: '',
        name: '',
        status: '',
        createdDate: '',
      },
      error: '',
    });
  };

  addTask = async e => {
    e.preventDefault();
    const newTask = this.state.currentTask;
    if (newTask.name === '') {
      this.setState({ error: 'Task name is required' });
      return;
    }

    const formBody = Object.keys(newTask)
      .map(key => `${encodeURIComponent(key) }=${ encodeURIComponent(newTask[key])}`)
      .join('&');

    const response = await fetch(routes.tasks.create(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    });

    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    await this.fetchTasks();
    this.clearCurrentTask();
  };

  deleteTask = async id => {
    const response = await fetch(routes.tasks.delete({ taskId: id }), {
      method: 'DELETE',
    });

    const body = await response.text();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    await this.fetchTasks();
  };

  render() {
    return (
      <div className="App">
        <TodoForm
          addTask={this.addTask}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentTask={this.state.currentTask}
        />
        <div className="error"> {
          this.state.error
            ? <span>{this.state.error}</span>
            : null
        }
        </div>
        <div className="tasks" > {
          this.state.tasks
            ? <TodoTasks
              tasks={this.state.tasks}
              deleteTask={this.deleteTask}
            />
            : 'Loading...'
        }
        </div>

      </div>
    );
  }
}

export default App;
