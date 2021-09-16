const express = require("express");
const multer = require("multer");
const girlsSexy = express.Router();
const sexyGirls = require("../models/sexyLadyGirls");
const upload = require("../utils/imageUpload");
const fs = require("fs");
const path = require("path");

girlsSexy.get("/sexy", async (_req, res) => {
  try {
    const sexy = await sexyGirls.find();
    sexy.sort((a, b) => b.createdAt - a.createdAt);
    res.render("../views/girls", { data: sexy });
  } catch (error) {
    res.status(400).send(error);
  }
});
girlsSexy.get("/sexy/random", async (req, res) => {
  try {
    const getSexy = await sexyGirls.find();
    const sexy = getSexy[Math.floor(Math.random() * getSexy.length)];
    res.render("../views/randomGirls", { data: sexy });
  } catch (error) {
    res.status(400).send(error);
  }
});
girlsSexy.post("/sexy", (req, res) => {
  try {
    upload(req, res, async (err) => {
      let checkFile = req.file.filename;
      if (err instanceof multer.MulterError) {
        res.render("../views/contribute/sexyContribute", { message: "" });
      } else if (err) {
        res.render("../views/contribute/sexyContribute", { message: "" });
      } else {
        // check image already exist
        const checkImage = await sexyGirls.findOne({
          image: req.file.filename,
        });
        if (!checkImage) {
          await new sexyGirls({
            image: req.file.filename,
            url: "/upload/" + req.file.filename,
            key: req.body.key,
            createdAt: Date.now(),
          }).save();
          res.render("../views/contribute/sexyContribute", { message: "" });
        } else {
          res.render("../views/contribute/sexyContribute", {
            message: "Image already exists",
          });
        }
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
girlsSexy.delete("/sexy/:id", async (req, res) => {
  try {
    const sexy = await sexyGirls.findById({ _id: req.params.id });
    fs.rmSync(path.join(__dirname, `../public/upload`, sexy.image));
    const rmSexy = await sexyGirls.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send(rmSexy);
  } catch (error) {
    res.status(400).send(error);
  }
});
/**delete all */
girlsSexy.delete("/sexy", async (req, res) => {
  try {
    const sexy = await sexyGirls.remove();
    res.send(sexy);
  } catch (error) {
    res.send(error);
  }
});

module.exports = girlsSexy;
