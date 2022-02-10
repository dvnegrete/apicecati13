const express = require("express");
const router = express.Router();
const EducativeOfferService = require("../services/EducativeOfferService");

const service = new EducativeOfferService();

router.get("/", (req, res)=>{
  const offer = service.find();
  res.send(offer);
});

module.exports = router;
