const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require('path');

const db = require("./firebase");
var admin = require("firebase-admin");

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'build')));

const merchRouter = require("./routes/merch");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const forumRouter = require("./routes/forum");

app.use("/merch", merchRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/forum", forumRouter);
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/public/index.html'));
});

app.listen(PORT, () => {
  console.log('listening');
});

module.exports = app;
