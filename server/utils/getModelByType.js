const { MediaModel, MediaNewModel } = require("../models/media.js");
const {
  GovernmentModel,
  GovernmentNewModel,
} = require("../models/government.js");
const { OrganizationModel, OrganizationNewModel } = require("../models/ngo.js");
const { BusinessModel, BusinessNewModel } = require("../models/business.js");
const { HotSpotModel, HotSpotNewModel } = require("../models/hotSpot.js");

const getModelByType = (type, isNew) => {
  switch (type) {
    case "NGO":
      return !isNew ? OrganizationModel : OrganizationNewModel;
    case "business":
      return !isNew ? BusinessModel : BusinessNewModel;
    case "media":
      return !isNew ? MediaModel : MediaNewModel;
    case "government":
      return !isNew ? GovernmentModel : GovernmentNewModel;
    case "hotSpot":
      return !isNew ? HotSpotModel : HotSpotNewModel;

    default:
      return null;
  }
};
module.exports = {
  getModelByType,
};
