const express = require("express");
const router = express.Router();
/* require("dotenv").config();
const { SECRET_JWT } = process.env; */
const { User } = require("../../models/users");
const bcrypt = require("bcryptjs");
const { validateEmail } = require("../../utils/utils");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { name, lastname, email, password } = req.body;
  if (validateEmail(email) === false) {
    return res.json({ msg: "email is not valid" });
  }
  let existentUser = await User.findOne({ email: email }).exec();
  if (existentUser) return res.json({ msg: "there an user for that email" });
  try {
    let hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
    });
    newUser.save();
    return res.json(newUser);
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;
