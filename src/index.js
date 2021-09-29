const express = require('express');
const db = require('./db/mongoose.js');
const User = require('./models/user.js');
const Task = require('./models/task.js');
const userRoute = require('../src/routes/user');

const app = express();
const port = process.env.PORT || 3000;
db.getConnect();
app.use(express.json());
app.use(userRoute);
// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.status(200).send(users);
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

// app.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const user = await User.findById(_id);
//         res.status(200).send(user);
//     } catch (err) {
//         res.status(500).send(err);
//     }
//     User.findById(_id)
//         .then((user) => {
//             res.send(user);
//         })
//         .catch((err) => {
//             res.status(200).send();
//         });
// });

// // app.post('/users', async (req, res) => {
// //     const user = new User(req.body);
// //     try {
// //         await user.save();
// //         res.status(201).send(user);
// //     } catch (err) {
// //         res.status(400).send();
// //     }
// // });

// app.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find({});
//         res.status(200).send(tasks);
//     } catch (err) {
//         res.status(500).send();
//     }
// });

// app.get('/tasks/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const task = await Task.findById(_id);
//         res.status(200).send(task);
//     } catch (err) {
//         res.status(500).send();
//     }
// });

// app.post('/tasks', async (req, res) => {
//     const task = new Task(req.body);

//     try {
//         await task.save();
//         res.status(201).send(task);
//     } catch (err) {
//         res.status(400).send(error);
//     }
// });

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

// app.patch('/tasks/:id', async (req, res) => {
//     const propertyUpdates = Object.keys(req.body);
//     const propertyAllowUpdates = Object.keys(Task);
//     const isValidOperation = propertyUpdates.every((pro) =>
//         propertyAllowUpdates.includes(pro)
//     );
//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid update' });
//     }
//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true,
//         });
//         if (!task) {
//             return res.sendStatus(404).send();
//         }
//         res.send(task);
//     } catch (err) {
//         res.status(400).send(e);
//     }
// });

// app.delete('/users/:id', async (req, res) => {
//     try {
//         const user = User.findByIdAndDelete(req.params.id);
//         if (!user) {
//             return res.sendStatus(404).send();
//         }
//         res.send(user);
//     } catch (err) {
//         res.status(400).send(e);
//     }
// });
app.listen(port, () => {
    console.log('Server is listening on port ' + port);
});

const bcrypt = require('bcrypt');

const myFunction = async () => {
    const password = 'Red12345';
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(password);
    console.log(hashedPassword);
};
myFunction();
