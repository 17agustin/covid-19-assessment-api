const axios = require("axios").default;
require("dotenv").config();
const { BASE_URL, RAPIDAPI_HOST, RAPIDAPI_KEY, SECRET_JWT } = process.env;
const jwt = require("jsonwebtoken");

const axiosFunction = async (param) => {
  const options = {
    method: "GET",
    url: `${BASE_URL}/${param}`,
    headers: {
      "x-rapidapi-host": RAPIDAPI_HOST,
      "x-rapidapi-key": RAPIDAPI_KEY,
    },
  };

  const response = await axios.request(options);
  try {
    return response.data.response;
  } catch (error) {
    return console.log(error);
  }
};

const validate = (valid, type) => {
  let passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (type === "password" ? passwordRegex.test(valid) :emailRegex.test(valid)) {
    return true;
  } else {
    return false;
  }
};

const decrypt = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader; /* .split(" ")[1] */
    req.token = bearerToken;
    jwt.verify(req.token, SECRET_JWT, (error, auth) => {
      if (error) return res.sendStatus(403);
      next();
    });
  } else {
    return res.sendStatus(403);
  }
};


module.exports = {
  axiosFunction,
  validate,
  decrypt
};
