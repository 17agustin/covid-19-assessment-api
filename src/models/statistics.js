const mongoose = require("mongoose");
const { Schema } = mongoose;
const types = require("./types")

const StatsSchema = new Schema({
  continent: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  population: {
    type: Number,
    required: false,
  },
  cases: types.cases,
  deaths: types.deaths,
  tests: types.tests,
  day: {
    type: String,
    required: false,
  },
  time: {
    type: String,
    required: false,
  },
});

const Statistic = mongoose.model("Statistic", StatsSchema);

module.exports = {Statistic};

/* {"statistics":{
  "continent":"Oceania",
  "country":"Micronesia",
  "population":115715,
  "cases":{
  "new":22,
  "active":0,
  "critical":12,
  "recovered":1,
  "1M_pop":"9",
  "total":1
  },
  "deaths":{
  "new":32,
  "1M_pop":"2",
  "total":33
  },
  "tests":{
  "1M_pop":"43",
  "total":3
  },
  "day":"2021-09-08",
  "time":"2021-09-08T17:00:04+00:00"
}} */