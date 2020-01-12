'use strict';

const mongoose = require('mongoose');

const Task = mongoose.model('Tasks');

exports.listAllTasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

exports.createTask = function(req, res) {
  const newTask = new Task(req);
  newTask.save(function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

exports.readTask = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

exports.updateTask = function(req, res) {
  Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};

exports.deleteTask = function(req, res) {
  Task.remove({ _id: req.params.taskId }, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Task successfully deleted' });
  });
};
