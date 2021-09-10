const express = require("express");
const router = express.Router()
const LoginRoute = require("./login")
const SignRoute = require("./signup")

router.use('/login', LoginRoute)
router.use('/signup', SignRoute)

module.exports = router