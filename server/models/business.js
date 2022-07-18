const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const business = new Schema({
  name: { type: String, required: true },
  location: {
    type: Object,
  },
  fields: {
    type: Array,
    required: true,
    validate: {
      validator: function (array) {
        return (
          array.every((item) => typeof item === "string") && array.length > 0
        );
      },
    },
  },
  category: {
    type: Array,
    required: true,
    validate: {
      validator: function (array) {
        return (
          array.every((item) => typeof item === "string") && array.length > 0
        );
      },
    },
  },
  description: { type: String },
  country: { type: String, required: true },
  link: { type: String },
  address: {
    type: String,
  },
  logo: { type: String },
  email: { type: String },
  key: { type: String },
  author: { type: String },
  date: {
    type: String
  },
  loc: [Number]
});

const businessNew = new Schema({
  name: { type: String, required: true },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
  },
  fields: {
    type: Array,
    required: true,
    validate: {
      validator: function (array) {
        return (
          array.every((item) => typeof item === "string") && array.length > 0
        );
      },
    },
  },
  category: {
    type: Array,
    required: true,
    validate: {
      validator: function (array) {
        return (
          array.every((item) => typeof item === "string") && array.length > 0
        );
      },
    },
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
  originalId: { type: String },
  comment: { type: String },
  status: { type: String, required: true },
  originalType: { type: String },
  loc: [Number]
});

const BusinessModel = mongoose.model("businesses", business);
const BusinessModelCopy = mongoose.model("businessescopy", business);
const BusinessNewModel = mongoose.model("businessNew", businessNew);

module.exports = {
  BusinessModel,
  BusinessNewModel,
  BusinessModelCopy
};
