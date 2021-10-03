const Task = require('../models/task');

module.exports = {
  createTask(req) {
    const newTask = new Task({
      ...req.body,
      owner: req.user._id,
    });
    return newTask.save();
  },
  findTaskById(idTask, idUser) {
    return Task.findOne({ _id: idTask, owner: idUser });
  },
  findAllTasks(idUser) {
    return Task.find({ owner: idUser });
  },
};
