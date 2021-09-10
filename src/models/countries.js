const mongoose = require("mongoose");
const { Schema } = mongoose;

const CountrySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Country = mongoose.model("Country", CountrySchema);

module.exports = {Country};