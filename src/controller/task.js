const taskRepository = require('../repository/task');

module.exports = {
  async create(req, res) {
    try {
      const task = await taskRepository.createTask(req);
      res.status(201).send(task);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  async findById(req, res) {
    try {
      const task = await taskRepository.findTaskById(
        req.params.id,
        req.user._id
      );
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    } catch (err) {
      res.status(500).send();
    }
  },
  async findAll(req, res) {
    try {
      // cachs 1
      //const tasks = await taskRepository.findAllTasks(req.user._id);
      // cach 2
      await req.user.populate('tasks');
      res.send(req.user.tasks);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
