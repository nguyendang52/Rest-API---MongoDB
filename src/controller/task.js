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
      const match = {};
      const sort = {};
      if (req.query.completed) {
        match.completed = req.query.completed;
      }
      if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
      }
      await req.user.populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort: {
            createdAt: -1,
          },
        },
      });
      res.send(req.user.tasks);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
