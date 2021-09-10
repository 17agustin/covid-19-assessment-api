const express = require("express");
const router = express.Router();
require("dotenv").config();
const { SECRET_JWT } = process.env;
const { User } = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader !== "undefined") {
    jwt.verify(authHeader, SECRET_JWT, (error, user) => {
      if (error) return res.sendStatus(403);
      return res.json(user);
    });
  } else {
    return res.sendStatus(403);
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email: email }).exec();
    var compare = user && (await bcrypt.compare(password, user.password));
    if (!compare)
      return res.json({
        msg: "Couldn't Login: authentication Error, please check your information",
      });
    const encrypt = {
      name: user.name,
      lastname: user.lastname,
      password: user.password,
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(encrypt, SECRET_JWT);
    const userResponse = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    };
    const response = {
      userResponse,
      token,
    };
    return res.json(response);
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;
