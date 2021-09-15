const express = require("express");
const multer = require("multer");
const girlsCute = express.Router();
const cuteGirls = require("../models/cuteGirls");
const upload = require("../utils/imageUpload");

girlsCute.get("/cute", async (_req, res) => {
  try {
    const cute = await cuteGirls.find();
    res.render("../views/girls", { data: cute });
  } catch (error) {
    res.status(400).send(error);
  }
});
girlsCute.get("/cute/random", async (req, res) => {
  try {
    const getCute = await cuteGirls.find();
    const cute = getCute[Math.floor(Math.random() * getCute.length)];
    res.render("../views/randomGirls", { data: cute });
  } catch (error) {
    res.status(400).send(error);
  }
});
girlsCute.post("/cute", (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        res.send(err.message);
      } else if (err) {
        res.send(err.message);
      } else {
        // check image already exist
        const checkImage = await cuteGirls.findOne({
          image: req.file.filename,
        });
        if (!checkImage) {
          await new cuteGirls({
            image: req.file.filename,
            url: "/upload/" + req.file.filename,
            createdAt: Date.now(),
          }).save();
          res.render("../views/contribute/cuteContribute", {
            message: "Upload image successfully",
          });
        } else {
          res.send("Image already exist");
        }
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
girlsCute.delete("/cute/:id", async (req, res) => {
  try {
    const cute = await cuteGirls.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send(cute);
  } catch (error) {
    res.status(400).send(error);
  }
});
/**delete all */
girlsCute.delete("/cute", async (req, res) => {
  try {
    const cute = await cuteGirls.remove();
    res.send(cute);
  } catch (error) {
    res.send(error);
  }
});

module.exports = girlsCute;
