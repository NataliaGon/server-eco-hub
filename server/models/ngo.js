const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizations = new Schema({
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
  description: { type: String },
  country: { type: String, required: true },
  link: { type: String, required: true },
  address: {
    type: String,
  },
  logo: { type: String },
  email: { type: String },
  key: { type: String },
  loc: [Number],
  date: {
    type: String
  }
});

const organizationNew = new Schema({
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
  description: { type: String },
  country: { type: String, required: true },
  link: { type: String, required: true },
  logo: { type: String },
  key: { type: String },
  email: { type: String },
  done: { type: Boolean },
  comment: { type: String },
  status: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  author: { type: String, required: true },
  originalId: { type: String },
  originalType: { type: String },
  loc: [Number],

});

const OrganizationModel = mongoose.model("organizations", organizations);
const OrganizationNewModel = mongoose.model("organizationNew", organizationNew);
const OrganizationModelCopy = mongoose.model("organizationsCopy", organizations);

module.exports = {
  OrganizationModel,
  OrganizationNewModel,
  OrganizationModelCopy
};
