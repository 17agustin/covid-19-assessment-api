const express = require("express");
const router = express.Router();
const SyncRoute = require("./sync/sync");
const AuthRoute = require("./authentication/auth");
const StatisticsRoute = require("./statistics/statistics");

router.get("/", async (req, res) => {
  res.json({ api: "covid 19 Api" });
});

router.use("/sync", SyncRoute);
router.use("/auth", AuthRoute);
router.use("/statistics", StatisticsRoute);

module.exports = router;
