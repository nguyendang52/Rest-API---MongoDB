const mongoose = require('mongoose');

getConnect = async () => {
    await mongoose.connect('mongodb://localhost:27017/task-manager-api', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connect Success!');
};
module.exports = { getConnect };

// const User = new mongoose.model('User', userSchema);
// const me = new User({
//     name: 'Truong',
//     email: 'truong@gmail.com',
//     age: 7,
//     password: 'password',
// });
// me.save()
//     .then(() => {
//         console.log(me);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// const taskSchema = new mongoose.Schema({
//     description: { type: String, trim: true, required: true },
//     completed: { type: Boolean, default: false },
// });
// const Task = mongoose.model('Task', taskSchema);

// const instanceTask = new Task({
//     description: 'Learn c#',
//     completed: false,
// });
// const createTask = async (task) => {
//     await task.save();
// };
// createTask(instanceTask);
module.exports = { getConnect };
