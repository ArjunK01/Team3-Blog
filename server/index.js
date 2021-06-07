const express = require("express");
const cors = require("cors");
const axios = require("axios");

const db = require("./firebase");
var admin = require("firebase-admin");

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());


const merchRouter = require("./routes/merch");
const userRouter = require("./routes/user");

app.use("/merch", merchRouter);
app.use("/user", userRouter);


app.listen(PORT, () => {
  console.log("Listening");
});

module.exports = app;
