const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cate = require("./categoryModel");

const girlsSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  cateId: {
    type: String,
    required: true,
  },
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
  updatedAt: {
    type: Date,
    required: false,
  },
});
module.exports = mongoose.model("girls", girlsSchema);
