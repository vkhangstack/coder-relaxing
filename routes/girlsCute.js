const express = require('express');
const multer = require('multer');
const girlsCute = express.Router();
const cuteGirls = require('../models/cuteGirls');
const upload = require('../utils/imageUpload');
const fs = require('fs');
const path = require('path');

girlsCute.get('/cute', async (_req, res) => {
  try {
    const cute = await cuteGirls.find();
    cute.sort((a, b) => b.createdAt - a.createdAt);
    return res.render('../views/girls', { data: cute });
  } catch (error) {
    return res.status(400).send(error);
  }
});
girlsCute.get('/cute/random', async (req, res) => {
  try {
    const getCute = await cuteGirls.find();
    const cute = getCute[Math.floor(Math.random() * getCute.length)];
    return res.render('../views/randomGirls', { data: cute });
  } catch (error) {
    return res.status(400).send(error);
  }
});
girlsCute.post('/cute', (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.render('../views/contribute/cuteContribute', {
          message: '',
        });
      } else if (err) {
        return res.render('../views/contribute/cuteContribute', {
          message: '',
        });
      } else {
        // check image already exist
        const checkImage = await cuteGirls.findOne({
          image: req.file.filename,
        });
        if (!checkImage) {
          await new cuteGirls({
            image: req.file.filename,
            url: '/upload/' + req.file.filename,
            key: req.body.key,
            createdAt: Date.now(),
          }).save();
          return res.render('../views/contribute/cuteContribute', {
            message: '',
          });
        } else {
          return res.render('../views/contribute/cuteContribute', {
            message: 'Image already exists',
          });
        }
      }
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});
girlsCute.delete('/cute/:id', async (req, res) => {
  try {
    const cute = await cuteGirls.findById({ _id: req.params.id });
    fs.rmSync(path.join(__dirname, `../public/upload`, cute.image));
    const rmCute = await cuteGirls.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).send(rmCute);
  } catch (error) {
    return res.status(400).send(error);
  }
});
/**delete all */
girlsCute.delete('/cute', async (req, res) => {
  try {
    const cute = await cuteGirls.remove();
    res.send(cute);
  } catch (error) {
    res.send(error);
  }
});
/**delete all and remove all images API hide*/
girlsCute.delete('/all', async (req, res) => {
  try {
    fs.rmSync(path.join(__dirname, `../public/upload/image*`));
    res.send('Removing all images OK');
  } catch (error) {
    res.send(error);
  }
});

module.exports = girlsCute;
