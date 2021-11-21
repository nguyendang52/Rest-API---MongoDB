const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadfile');

router.get('/users/me', auth, userController.read);
router.get('/users/:id/avatar', userController.getAvatar);

router.post('/users', userController.create);
router.post('/users/login', userController.login);
router.post('/users/logout', auth, userController.logout);
router.post('/users/logoutAll', auth, userController.logoutAll);
router.post(
  '/users/me/avatar',
  auth,
  upload.uploadAvatar,
  userController.uploadAvatar,
  userController.uploadFail
);

router.patch('/users/me', auth, userController.update);

router.delete('/users/me', auth, userController.delete);
router.delete('/users/me/avatar', auth, userController.deleteAvatar);
module.exports = router;
