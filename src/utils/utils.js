const axios = require("axios").default;
require("dotenv").config();
const { 
  BASE_URL,
  RAPIDAPI_HOST,
  RAPIDAPI_KEY,
  SECRET_JWT
 } = process.env;
 const jwt = require("jsonwebtoken")

const {Country} = require("../models/countries");
const {Statistic} = require("../models/statistics")

const axiosFunction = async (param) => {
  const options = {
    method: "GET",
    url: `${BASE_URL}/${param}`,
    headers: {
      "x-rapidapi-host": RAPIDAPI_HOST ,
      "x-rapidapi-key":
        RAPIDAPI_KEY ,
    },
  };

  const response = await axios.request(options);
  try {
    return response.data.response;
  } catch (error) {
    return console.log(error);
  }
};

const validateEmail = (email) => {
  let regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
};

const populateCountries = async () => {
  const isPopulated = await Country.findOne({ name: "Afghanistan" }).exec();
  if (isPopulated) return console.log("countries are already populated"); // doesn't create any document if it's already populated
  let param = "countries";
  const response = await axiosFunction(param);
  if (response) {
    response.map(async (country) => {
      await Countries.create({ name: country });
    });
    return console.log("countries populated")
};
}

const decrypt = (req, res, next) => {
  const bearerHeader =  req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
       const bearerToken = bearerHeader/* .split(" ")[1] */;
       req.token  = bearerToken;
       jwt.verify(req.token,SECRET_JWT,(error, auth)=> {
         if(error) return res.sendStatus(403);
         next();
       })
  }else{
    return res.sendStatus(403);
  }
}

module.exports = {
  axiosFunction,
  validateEmail,
  populateCountries,
  decrypt
};
