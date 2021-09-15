const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cuteGirlsSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("cuteGirls", cuteGirlsSchema);
