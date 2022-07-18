const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const media = new Schema({
  name: { type: String, required: true },
  address: {
    type: String,
    required: true,
  },
  description: { type: String },
  country: { type: String, required: true },
  link: { type: String, required: true },
  logo: { type: String },
  key: { type: String },
  email: { type: String },
  date: { type: String },
  author: { type: String },
  location: {
    type: Object,
  },
  loc: [Number],
});

const mediaNew = new Schema({
  name: { type: String, required: true },
  address: {
    type: String,
    required: true,
  },
  description: { type: String },
  country: { type: String, required: true },
  link: { type: String, required: true },
  logo: { type: String },
  key: { type: String },
  email: { type: String },
  done: { type: Boolean },
  date: {
    type: Date,
    default: Date.now,
  },
  author: { type: String, required: true },
  location: {
    type: Object,
  },
  originalId: { type: String },
  comment: { type: String },
  status: { type: String, required: true },
  originalType: { type: String },
  loc: [Number],

});

const MediaModel = mongoose.model("media", media);
const MediaModelCopy = mongoose.model("mediacopy", media);
const MediaNewModel = mongoose.model("mediaNew", mediaNew);

module.exports = {
  MediaModel,
  MediaNewModel,
  MediaModelCopy
};
