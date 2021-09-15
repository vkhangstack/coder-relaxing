const express = require("express");
const contribute = express.Router();

contribute.get("/contribute", async (_req, res) => {
  res.render("../views/contribute/contribute");
});
contribute.get("/contribute/sexy", async (_req, res) => {
  res.render("../views/contribute/sexyContribute.ejs");
});
contribute.get("/contribute/cute", async (_req, res) => {
  res.render("../views/contribute/cuteContribute.ejs");
});
module.exports = contribute;
