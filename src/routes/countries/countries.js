const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const {decrypt} = require("../../utils/utils")

//  Models

const {Country} = require("../../models/countries");
router.use(decrypt)

router.get("/", async (req, res) => {
  const countries = await Country.find();
  try {
    return res.json({ countries: countries });
  } catch (error) {
    console.log(error);
    return res.json({ "api": "failed request" });
  }
});

module.exports = router;
