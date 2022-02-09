const express = require("express");
const router = express.Router();
const path = require("path");
const pathProyect = require("../path")

router.get("/", (req, res)=> {
  res.sendFile(path.join(pathProyect + "/views/upload.html"))
})

module.exports = router;
