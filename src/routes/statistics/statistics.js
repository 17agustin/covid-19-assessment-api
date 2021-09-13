const express = require("express");
const router = express.Router();
const { decrypt, separateByContinents } = require("../../utils/utils");

//  Models

const { Statistic } = require("../../models/statistics");

// Middleware

router.use(decrypt);

//Routes

router.get("/", async (req, res) => {
  const { query } = req.query;
  if (query) {
    const country = query.toLowerCase();
    const secondSearch = await Statistic.find({}).sort([["continent", -1]]);

    const response = secondSearch.filter(
      (stat) =>
        stat.country.toLowerCase() === country ||
        stat.country.toLowerCase().includes(country)
    );

    if (response) {
      res.json([response]);
    } else {
      return res.json({ msg: "country not found" });
    }
  } else {
    try {
      const statistics = await Statistic.find({}).sort([["continent", -1]]);

      const allStats = separateByContinents(statistics);

      return res.json(allStats);
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
  const { deaths, cases, tests } = req.body;
  try {
    const fin = await Statistic.findByIdAndUpdate(id, {
      cases: {
        new: cases.new,
        active: cases.active,
        critical: cases.critical,
        recovered: cases.recovered,
        total: cases.total,
      },
      deaths: {
        new: deaths.new,
        total: deaths.total,
      },
      tests: {
        total: tests,
      },
    });
    return res.json(fin);
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;
