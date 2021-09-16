const express = require("express");
const contribute = express.Router();

contribute.get("/contribute", async (_req, res) => {
  res.render("../views/contribute/login", { message: "" });
});
contribute.get("/contribute/sexy", async (_req, res) => {
  res.render("../views/contribute/sexyContribute", { message: "" });
});
contribute.get("/contribute/cute", async (_req, res) => {
  res.render("../views/contribute/cuteContribute", { message: "" });
});
module.exports = contribute;
