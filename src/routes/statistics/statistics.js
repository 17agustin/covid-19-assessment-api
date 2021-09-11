const express = require("express");
const router = express.Router();
const { decrypt } = require("../../utils/utils");

//  Models

const { Statistic } = require("../../models/statistics");

// Middleware

router.use(decrypt);

//Routes

router.get("/", async (req, res) => {
  const { query } = req.query;
  if (query) {
    const country =
      query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();
    const queryCountry = await Statistic.findOne({ country }).exec();
    if (queryCountry) {
      const id = await Statistic.findById(queryCountry._id).exec();
      if (id) res.json(id._id);
    } else {
      return res.json({ msg: "country not found" });
    }
  } else {
    try {
      const final = await Statistic.find({}).sort([["continent", -1]]);
      return res.json(final);
    } catch (error) {
      return console.log(error);
    }
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fin = await Statistic.findById(id);
    return res.json(fin);
  } catch (error) {
    return console.log(error);
  }
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { deaths , cases , tests } = req.body;
  try {
    const fin = await Statistic.findByIdAndUpdate(id, { 
      cases:{
        new: cases.new,
        active: cases.active,
        critical: cases.critical,
        recovered: cases.recovered,
        total:  cases.total
      },
      deaths:{
        new:deaths.new,
        total: deaths.total
      },
      tests:{
        total: tests.total
      }
     });
    return res.json(fin);
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;
