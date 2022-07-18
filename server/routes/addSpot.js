const NodeGeocoder = require("node-geocoder");
const { getModelByType } = require("../utils/getModelByType");
const { sendEmail } = require("../utils/mailer");

const options = {
  provider: "google",
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
};

const geocoder = NodeGeocoder(options);

async function getLocation(company) {
  const data = await geocoder.geocode(company.address);

  company.location = {
    lat: data[0]?.latitude?.toString(),
    lng: data[0]?.longitude?.toString(),
  };
  company.loc = [data[0]?.longitude, data[0]?.latitude]
}

module.exports = function (req, res) {
  const company = req.body;
  company.status = "onreview";
  delete company._id;
  Promise.all([getLocation(company)]).then(() => {
    const model = getModelByType(company.type, true);
    const item = new model(company);
    if (!company.location.lat || !company.location.lng) {
      return res
        .status(404)
        .send("Address is wrong. Please change the address and try again");
    }
    item.save(company).then((a) => {
      if (a._id) {
        company.email && sendEmail(company.email, company.language, "add");
        return res.status(200).send("You successfully added a spot");
      }
      if (!a._id) return res.status(500).send("Your spot wasn't added");
    });
  });
};
