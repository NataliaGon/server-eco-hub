const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  key: {
    type: String,
    required: true,
  },
  author: { type: String },
  source: {
    type: String,
  },
  country: { type: String },
  field: { type: String },
});
const NewsModel = mongoose.model("news", newsSchema);

module.exports = { NewsModel };
