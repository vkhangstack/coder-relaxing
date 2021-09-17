const express = require("express");
const key = express.Router();
const { v4: uuidv4 } = require("uuid");
const privateKey = require("../models/privateKey");

key.get("/key", async (_req, res) => {
  return res.render("../views/contribute/login");
});
key.post("/key", async (_req, res) => {
  try {
    const key = await new privateKey({
      key: uuidv4(),
      role: "public",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }).save();
    return res.render("../views/contribute/admin", { data: key });
  } catch (error) {
    return res.send(error);
  }
});

key.post("/login", async (req, res) => {
  try {
    const checkLogin = await privateKey.findOne({
      key: req.body.key,
    });
    if (!checkLogin) {
      return res.render("../views/contribute/login", {
        message: "Your key does not exist.",
      });
    } else {
      if (checkLogin.role === "admin") {
        return res.render("../views/contribute/admin", { data: "" });
      } else {
        return res.render("../views/contribute/contribute", {
          key: checkLogin.key,
        });
      }
    }
  } catch (error) {
    res.send(error);
  }
});
/**delete key */
key.delete("/key/:id", async (req, res) => {
  try {
    const key = privateKey.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).send(key);
  } catch (error) {
    return res.send(error);
  }
});
module.exports = key;
