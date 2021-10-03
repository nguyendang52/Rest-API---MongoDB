const User = require('../models/user');

module.exports = {
  createUser(stu) {
    const newUser = new User(stu);
    return newUser.save();
  },

  readUser() {
    return User.find({});
  },

  updateUser(id, stu, propertyUpdates) {},

  login(email, password) {
    return User.findByCredentials(email, password);
  },

  deleteUser(user) {
    return user.remove();
  },
};
