const express = require('express');
const router = express.Router();
const SyncRoute = require("./sync/sync")
const AuthRoute = require("./authentication/auth");
const StatisticsRoute = require("./statistics/statistics")
const CountriesRoute = require("./countries/countries")

// Task Model
//const Task = require('../models/task');

// GET all Tasks
router.get('/', async (req, res) => {
  res.json({"api":"covid 19 Api"});
});

router.use('/sync', SyncRoute)
router.use('/auth', AuthRoute)
router.use('/statistics', StatisticsRoute)
router.use('/countries', CountriesRoute)

module.exports = router



/* var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://covid-193.p.rapidapi.com/statistics',
  headers: {
    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
    'x-rapidapi-key': '341e3328bfmshd25d803c3b6479cp1198d0jsnb4b05e5e0ee6'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
}); */