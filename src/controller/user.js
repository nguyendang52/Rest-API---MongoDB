const userRepository = require('../repository/user');

module.exports = {
    async create(req, res) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync('B4c0//', salt);

            await userRepository.createUser(req.body);

            res.status(201).send(user);
        } catch (err) {
            res.status(400).send();
        }
    },
};
