const express = require("express");
// const bodyParser = require("body-parser")

const errorMiddleware = require("./middleware/error");
const app = express();


app.use(express.json());

const product = require("./routes/productRoute");



app.use("/api/v1",product);

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(errorMiddleware);

module.exports =app