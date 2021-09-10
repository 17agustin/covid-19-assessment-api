const express = require("express");
const router = express.Router();
const { axiosFunction, decrypt } = require("../../utils/utils");

//  Models

const { Statistic } = require("../../models/statistics");

//Middlewares

router.use(decrypt);

//Routes

router.get("/", async (req, res) => {
  try {
    await Statistic.deleteMany();
    let param = "statistics";
    const response = await axiosFunction(param);
    await response.forEach(async (elem) => {
      let newStat = await new Statistic(elem);
      await newStat.save();
    });
    console.log("data has been overwritten");
    return res.json({ api: "data has been overwritten" });
  } catch (error) {
    return res.json({ api: "error" });
  }
});

module.exports = router;
