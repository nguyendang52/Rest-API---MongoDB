const express = require('express');

const db = require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

// const auth = require('./middleware/auth');
const userRoute = require('./routes/user');
const taskRoute = require('./routes/task');
const app = express();
const port = process.env.PORT;

db.getConnect();

app.use(express.json());
app.use(taskRoute);
app.use(userRoute);

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
