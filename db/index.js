const mongoose = require('mongoose')
require('dotenv').config()

const DB_URL= process.env.DB_URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DB_URL, options).then(() => {
  console.log("DB READY TO USE");
});