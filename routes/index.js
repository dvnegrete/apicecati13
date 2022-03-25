const express = require("express");
const uploadRouter = require("./uploadRouter");
const updateRouter = require("./updateRouter");
const educativeOffer = require("./educativeOfferRouter");
const specialitieRouter = require("./specialitieRouter");

function routerApi(app) {
  const router = express.Router();
  app.use("/API/v1", router);
  router.get("/", (req, res) =>{
    res.send("API del CECATI 13.");
  });
  router.use("/upload", uploadRouter);
  router.use("/update", updateRouter);
  router.use("/educativeOffer", educativeOffer)
  router.use("/specialtie", specialitieRouter)
}

module.exports = routerApi;
