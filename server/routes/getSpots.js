const { GovernmentModel } = require("../models/government.js");
const { MediaModel } = require("../models/media.js");
const { OrganizationModel } = require("../models/ngo.js");
const { BusinessModel } = require("../models/business.js");
const { HotSpotModel } = require("../models/hotSpot");
const { getOrganizations, getBusinesses, findSpots } = require("./../utils/utils.js");



module.exports = function (req, res) {
    const { page } = req?.query;
    if (!page) {

        req.query.filterType === "business" &&

            BusinessModel.find(
                getBusinesses({
                    businessFields: req.query.businessFields.split(","),
                    countries: req.query.countries.split("&"),
                }), "location key country name",

                function (err, docs) {

                    const docsWithLocations = docs?.filter(
                        (spot) => spot?.location?.lat && spot?.location?.lng
                    )
                    return res.status(200).send({ spots: docsWithLocations });
                });

        req.query.filterType === "NGO" &&

            OrganizationModel.find(
                getOrganizations({
                    organizationFields: req.query.organizationFields.split(","),
                    countries: req.query.countries.split("&"),
                }), "location key country  name",

                function (err, docs) {
                    const docsWithLocations = docs?.filter(
                        (spot) => spot?.location?.lat && spot?.location?.lng
                    )
                    return res.status(200).send({ spots: docsWithLocations });
                });
        req.query.filterType === "media" &&
            MediaModel.find(
                {
                    country: req.query.countries.split("&"),
                }, "location key country name",
                function (err, docs) {
                    const docsWithLocations = docs.filter(
                        (spot) => spot?.location?.lat && spot?.location?.lng
                    );
                    return res.status(200).send({ spots: docsWithLocations });
                }
            );

        req.query.filterType === "government" &&
            GovernmentModel.find(
                {
                    country: req.query.countries.split("&"),
                }, "location key country  name",
                function (err, docs) {
                    const docsWithLocations = docs.filter(
                        (spot) => spot?.location?.lat && spot?.location?.lng
                    );
                    return res.status(200).send({ spots: docsWithLocations });
                }
            );

        req.query.filterType === "hotSpot" &&
            HotSpotModel.find(
                getOrganizations({
                    organizationFields: req.query.organizationFields.split(","),
                    countries: req.query.countries.split("&"),
                }), "location key country name",
                function (err, docs) {
                    const docsWithLocations = docs.filter((spot) => {
                        return spot?.location?.lat && spot?.location?.lng;
                    });
                    return res.status(200).send({ spots: docsWithLocations });
                }
            )

    }


    if (page) {
        const boundsObj = req?.query?.bounds && JSON.parse(req.query.bounds)
        req.query.filterType === "NGO" &&
            findSpots({ model: OrganizationModel, fields: req.query.organizationFields.split(","), countries: req.query.countries.split("&"), bounds: boundsObj, page, res })

        if (req.query.filterType === "business") {
            findSpots({ model: BusinessModel, fields: req.query.businessFields.split(","), countries: req.query.countries.split("&"), bounds: boundsObj, page, res })
        }

        req.query.filterType === "media" &&
            findSpots({ model: MediaModel, countries: req.query.countries.split("&"), bounds: boundsObj, page, res })

        req.query.filterType === "government" &&
            findSpots({ model: GovernmentModel, countries: req.query.countries.split("&"), bounds: boundsObj, page, res })

        req.query.filterType === "hotSpot" &&
            findSpots({ model: HotSpotModel, fields: req.query.organizationFields.split(","), countries: req.query.countries.split("&"), bounds: boundsObj, page, res })

    }
}