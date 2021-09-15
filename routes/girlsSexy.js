const express = require("express");
const multer = require("multer");
const girlsSexy = express.Router();
const sexyGirls = require("../models/sexyLadyGirls");
const upload = require("../utils/imageUpload");

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
    res.status(200).send(sexy);
    // res.render("../views/girls", { data: sexy });
  } catch (error) {
    res.status(400).send(error);
  }
});
girlsSexy.post("/sexy", (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        res.send(err.message);
      } else if (err) {
        res.send(err.message);
      } else {
        // check image already exist
        const checkImage = await sexyGirls.findOne({
          image: req.file.filename,
        });
        if (!checkImage) {
          const sexy = await new sexyGirls({
            image: req.file.filename,
            url: "/upload/" + req.file.filename,
            createdAt: Date.now(),
          }).save();
          res.status(200).send(sexy);
        } else {
          res.send("Image already exist");
        }
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
girlsSexy.delete("/sexy/:id", async (req, res) => {
  try {
    const sexy = await sexyGirls.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send(sexy);
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
