const userRepository = require('../repository/user');

module.exports = {
    async create(req, res) {
        try {
            await userRepository.createUser(req.body);
            res.status(201).send(user);
        } catch (err) {
            res.status(400).send();
        }
    },
};
