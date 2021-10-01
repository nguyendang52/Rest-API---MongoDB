const userRepository = require('../repository/user');

module.exports = {
  async create(req, res) {
    try {
      // const salt = bcrypt.genSaltSync(10);
      // const hash = bcrypt.hashSync("B4c0//", salt);

      const user = await userRepository.createUser(req.body);
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async read(req, res) {
    try {
      const users = await userRepository.readUser();

      res.status(200).send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async update(req, res) {
    // const propertyUpdates = Object.keys(req.body);
    // const propertyAllowUpdates = Object.keys(User);
    // const isValidOperation = propertyUpdates.every((pro) =>
    //   propertyAllowUpdates.includes(pro)
    // );
    // if (!isValidOperation) {
    //   return res.status(400).send({ error: "Invalid update" });
    // }
    // try {
    //   // const user = await userRepository.updateUser(req.params.id, req.body, {
    //   //   new: true,
    //   //   runValidators: true,
    //   // });
    //   const user = await userRepository.updateUser(
    //     req.params.id,
    //     req.body,
    //     propertyUpdates
    //   );
    //   if (!user) {
    //     return res.sendStatus(404).send();
    //   }
    //   res.send(user);
    // } catch (err) {
    //   res.status(400).send(e);
    // }
  },
  async login(req, res) {
    try {
      const user = await userRepository.login(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.status(200).send({ user, token });
    } catch (e) {
      res.status(400).send();
    }
  },

  // app.patch('/users/:id', async (req, res) => {
  //     const propertyUpdates = Object.keys(req.body);
  //     const propertyAllowUpdates = Object.keys(User);
  //     const isValidOperation = propertyUpdates.every((pro) =>
  //         propertyAllowUpdates.includes(pro)
  //     );
  //     if (!isValidOperation) {
  //         return res.status(400).send({ error: 'Invalid update' });
  //     }
  //     try {
  //         const user = await User.findByIdAndUpdate(req.params.id, req.body, {
  //             new: true,
  //             runValidators: true,
  //         });
  //         if (!user) {
  //             return res.sendStatus(404).send();
  //         }
  //         res.send(user);
  //     } catch (err) {
  //         res.status(400).send(e);
  //     }
  // });
};
