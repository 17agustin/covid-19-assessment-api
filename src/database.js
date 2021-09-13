const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_DB_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      const Mockgoose = require("mockgoose").Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage().then(() => {
        mongoose.connect(MONGO_DB_URI, options).then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    } else {
      mongoose.connect(MONGO_DB_URI, options).then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
