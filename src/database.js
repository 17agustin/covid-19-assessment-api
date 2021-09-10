const mongoose = require("mongoose");

const URI =
  "mongodb+srv://mongo_user:t3r0mp0s@mongocluster.6rwzn.mongodb.net/covid19stats?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(URI, options)
  .then((db) => console.log("Db is connected"))
  .catch((error) => console.error(error));

module.exports = mongoose;
