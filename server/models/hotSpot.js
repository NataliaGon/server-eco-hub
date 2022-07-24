const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotSpotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photos: {
    type: Array,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  author: { type: String },
  relatedOrganizations: {
    type: Array,
  },
  email: { type: String },
  links: {
    type: Array,
    required: true,
  },
  country: { type: String, required: true },
  fields: { type: Array, required: true },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true
  },
  problem: {
    type: Array,
    required: true,
  },
  timeline: {
    type: Array,
    required: true,
  },
  loc: [Number],
  date: {
    type: String,
  },
  titleSEO: {
    type: String,
  },
  descriptionSEO: {
    type: String,
  },
  videos: {
    type: Array,
  },
});

const hotSpotNewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photos: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  key: {
    type: String,
  },
  author: { type: String },

  relatedOrganizations: {
    type: Array,
  },
  links: {
    type: Array,
    required: true,
  },
  country: { type: String, required: true },
  fields: { type: Array, required: true },
  email: { type: String },
  originalId: { type: String },
  originalType: { type: String },
  comment: { type: String },
  status: { type: String },
  id: { type: String },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true
  },
  problem: {
    type: Array,
    required: true,
  },
  timeline: {
    type: Array,
    required: true,
  },
  loc: [Number],
  titleSEO: {
    type: String,
  },
  descriptionSEO: {
    type: String,
  },
  videos: {
    type: Array,
  },
});

const HotSpotModel = mongoose.model("hotSpot", hotSpotSchema);
const HotSpotNewModel = mongoose.model("hotSpotNews", hotSpotNewSchema);

module.exports = { HotSpotModel, HotSpotNewModel };
