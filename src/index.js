const express = require('express');

const db = require('./db/mongoose.js');
const User = require('./models/user.js');
const Task = require('./models/task.js');

// const auth = require('./middleware/auth');
const userRoute = require('../src/routes/user');
const taskRoute = require('../src/routes/task');
const app = express();
const port = process.env.PORT || 3000;

db.getConnect();

app.use(express.json());
app.use(taskRoute);
app.use(userRoute);

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
