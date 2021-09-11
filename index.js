const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const db = require("./src/database")

const indexRoute = require("./src/routes/index");

// Db connection
const { mongoose } = require("./src/database");

// Settings
app.set("port", process.env.PORT || 3001);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", indexRoute);

// Starting the server // connect database

db.connect()
.then(()=>{
  app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
})

module.exports = app;