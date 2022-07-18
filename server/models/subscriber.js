const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subscriber = new Schema({
  email: { type: String },
  language: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

const SubscriberModel = mongoose.model("subscriber", subscriber);

module.exports = {
  SubscriberModel,
};
