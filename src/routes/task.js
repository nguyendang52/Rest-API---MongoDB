const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controller/task');

router.post('/tasks', auth, taskController.create);
router.get('/tasks/:id', auth, taskController.findById);
router.get('/tasks', auth, taskController.findAll)
module.exports = router;
