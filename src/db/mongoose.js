const mongoose = require('mongoose');

getConnect = async () => {
  await mongoose.connect(process.env.MONGODB_URL + process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connect Success!');
};

module.exports = { getConnect };
