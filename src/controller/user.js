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
    res.send(req.user);
  },

  async update(req, res) {
    const propertyUpdates = Object.keys(req.body);

    const propertyAllowUpdates = Object.getOwnPropertyNames(
      req.user.toObject()
    );
    console.log(req.user);
    console.log(propertyAllowUpdates);
    const isValidOperation = propertyUpdates.every(prop =>
      propertyAllowUpdates.includes(prop)
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid update1' });
    }
    try {
      propertyUpdates.forEach(prop => {
        req.user[prop] = req.body[prop];
      });

      await req.user.save();
      res.send(req.user);
    } catch (err) {
      res.status(400).send({ error: 'invalid' });
    }
  },
  async login(req, res) {
    try {
      console.log(req.body.email);
      console.log(req.body.password);
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
  async logout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter(token => {
        return token.token !== req.token;
      });
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  },
  async logoutAll(req, res) {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  },

  async delete(req, res) {
    try {
      await userRepository.deleteUser(req.user);
      res.send(req.user);
    } catch (e) {
      res.status(500).send();
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
