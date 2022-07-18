const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const government = new Schema({
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
  date: {
    type: String
  }
});

const governmentNew = new Schema({
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
    type: String
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

const GovernmentModel = mongoose.model("government", government);
const GovernmentNewModel = mongoose.model("governmentNew", governmentNew);

module.exports = {
  GovernmentModel,
  GovernmentNewModel,
};
