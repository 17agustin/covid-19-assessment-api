const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const db = require("./src/database")

const indexRoute = require("./src/routes/index");

// Db connection
const { mongoose } = require("./src/database");

// Settings
const host = process.env.HOST || '0.0.0.0'
app.set("port", process.env.PORT || 3001);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// Routes
app.use("/api", indexRoute);

// Starting the server // connect database

db.connect()
.then(()=>{
  app.listen(app.get("port"),host, () => {
  console.log(`Server on port ${app.get("port")}`);
});
})

module.exports = app;