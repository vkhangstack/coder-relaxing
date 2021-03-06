const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sexyLadyGirlsSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('sexyLadyGirls', sexyLadyGirlsSchema);
