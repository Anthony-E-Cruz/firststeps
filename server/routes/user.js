const express = require("express");
const router = express.Router();

function routes(app) {
  router.get("/user", (req, res) => {
    res.end("this is the user route");
  });

  return router;
};

module.exports = routes;