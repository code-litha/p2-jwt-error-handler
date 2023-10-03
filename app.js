require("dotenv").config(); // untuk bisa baca file .env kita

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./router");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Connected to port `, PORT);
});
