const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_DB_URI } = process.env;


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(MONGO_DB_URI, options)
  .then(() => console.log("Db is connected"))
  .catch((error) => console.error(error));

module.exports = mongoose;
