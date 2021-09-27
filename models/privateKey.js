const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privateKeySchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  role: {
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

module.exports = mongoose.model('privateKey', privateKeySchema);
