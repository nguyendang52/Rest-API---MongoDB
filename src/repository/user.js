const User = require('../models/user');

module.exports = {
    createUser(stu) {
        const newUser = new User(stu);
        return newUser.save();
    },
};
