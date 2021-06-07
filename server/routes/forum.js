var express = require("express");
var router = express.Router();
const db = require("../firebase");

router.get("/", (req, res) => {
  res.send("test");
});

module.exports = router;
