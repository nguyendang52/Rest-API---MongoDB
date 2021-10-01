const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
// router.get('/users/:id');
// router.get('/users');
// router.post('/users');
// router.patch('/users/:id');
// router.delete('/users/:id');
router.post('/users', userController.create);
router.post('/users/login', userController.login);

router.get('/users', userController.read);
router.patch('/users/:id', userController.update);
module.exports = router;
