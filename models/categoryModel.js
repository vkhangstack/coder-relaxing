const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cateSchema = new Schema({
  name: {
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

module.exports = mongoose.model("cate", cateSchema);
