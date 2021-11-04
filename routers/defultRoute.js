const express = require("express");

const route = express.Router();
const defultEndPoint = (req, res) => {
  res.send("404 page not fund");
};

route
  .route("*")
  .get(defultEndPoint)
  .patch(defultEndPoint)
  .post(defultEndPoint)
  .delete(defultEndPoint);

  module.exports = route
