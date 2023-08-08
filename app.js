require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middleware/errorHandler");

console.log(process.env, "<<<< env");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const myLogger = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(myLogger);
app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Connected to port `, PORT);
});
