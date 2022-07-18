const { GovernmentModel } = require("../models/government.js");
const { MediaModel } = require("../models/media.js");
const { OrganizationModel } = require("../models/ngo.js");
const { BusinessModel } = require("../models/business.js");
const { HotSpotModel } = require("../models/hotSpot.js");


module.exports = function (req, res) {
  const organization = JSON.parse(req.query.organization);
  const { key } = organization;
  if (organization.type === "NGO") {
    OrganizationModel.find({ key }, function (err, docs) {
      return res.status(200).send(docs);
    });
  }
  if (organization.type === "business") {
    BusinessModel.find({ key }, function (err, docs) {
      return res.status(200).send(docs);
    });
  }
  if (organization.type === "media") {
    MediaModel.find({ key }, function (err, docs) {
      return res.status(200).send(docs);
    });
  }
  if (organization.type === "government") {
    GovernmentModel.find({ key }, function (err, docs) {
      return res.status(200).send(docs);
    });
  }
  if (organization.type === "hotSpot") {
    HotSpotModel.find({ key }, function (err, docs) {
      return res.status(200).send(docs);
    });
  }
};
