const { base } = require('../models/task');
const userRepository = require('../repository/user');
const sharp = require('sharp');
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
  async uploadAvatar(req, res) {
    const buffer = await sharp(req.file.buffer)
      .resize(250, 250)
      .png()
      .toBuffer();
    req.user.avatar = new Buffer.from(buffer, 'base64');
    await req.user.save();
    res.send();
  },
  async uploadFail(error, req, res, next) {
    res.status(400).send({
      error: error.message,
    });
  },
  async deleteAvatar(req, res) {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  },
  async getAvatar(req, res) {
    try {
      console.log(req.params.id);
      const user = await userRepository.readUserById(req.params.id);

      if (!user || !user.avatar) {
        throw new Error();
      }
      res.set('Content-Type', 'image/png');
      res.send(user.avatar);
    } catch (err) {
      console.log('co loi');
      res.status(404).send();
    }
  },
};
