const { maxNumberSpotsResults } = require("../utils/constants");


const adaptField = (fields) => fields.map((field) => ({ fields: field }));


const getFilters = ({ countries, fields, bounds }) => {
  if (countries?.length && fields?.length && bounds) {
    return {
      $or: adaptField(fields),
      country: countries,
      loc: {
        $within: {
          $box: bounds
        }
      }
    }
  }
  if (countries?.length && !fields && bounds) {
    return {

      country: countries,
      loc: {
        $within: {
          $box: bounds
        }
      }
    }
  }
  if (countries?.length && fields?.length && !bounds) {
    return {
      $or: adaptField(fields),
      country: countries,

    }
  }
  if (countries?.length && !fields && !bounds) {
    return {

      country: countries,

    }
  }
}

const getOrganizations = ({ countries, organizationFields }) => {
  if (countries.length && organizationFields.length) {
    return {
      $or: adaptField(organizationFields),
      country: countries,
    };
  }
};

const getBusinesses = ({ countries, businessFields, bounds }) => {
  if (countries.length && businessFields.length && bounds) {
    const boundsObj = JSON.parse(bounds)

    if (boundsObj.swLng > boundsObj.neLng) {

      return {
        $or: adaptField(businessFields), country: countries,
        loc: {
          $within: {
            $box: [[-180, boundsObj.swLat], [boundsObj.neLng, boundsObj.neLat]]
          }
        }
      }
    } else {
      return {
        $or: adaptField(businessFields), country: countries,
        loc: {
          $within: {
            $box: [[boundsObj.swLng, boundsObj.swLat], [boundsObj.neLng, boundsObj.neLat]]
          }
        }
      }

    }

  }
  if (countries.length && businessFields.length && !bounds) {

    return { $or: adaptField(businessFields), country: countries }
  };

};





const findSpots = ({ model, fields, countries, bounds, page, res }) => {

  if (!bounds || !bounds?.swLng || !bounds?.neLng || !bounds?.neLat || !bounds?.neLat) {
    model.find(
      getFilters({
        countries, fields
      }),
      function (err, docs) {
        const docsWithLocations = docs?.filter(
          (spot) => spot?.location?.lat && spot?.location?.lng
        )
        model.countDocuments(getFilters({
          countries, fields
        }), (err, spotsAmount) =>
          res.status(200).send({ spots: docsWithLocations, spotsAmount })
        );

      }).sort({ $natural: -1 })
      .skip(maxNumberSpotsResults * (page - 1))
      .limit(maxNumberSpotsResults);
  }
  if (bounds?.swLng > bounds?.neLng) {

    const requests = [
      {
        filter: getFilters({
          countries, fields, bounds: [[-180, bounds.swLat], [bounds.neLng, bounds.neLat]]
        })
      },
      {
        filter: getFilters({
          countries, fields, bounds: [[bounds.swLng, bounds.swLat], [180, bounds.neLat]]
        })
      },
    ]
    Promise.all(
      requests.map((item) =>
        model.find(

          item.filter,
          function (err, docs) {

          })
          .sort({ $natural: -1 })
          .skip(maxNumberSpotsResults * (page - 1))
          .limit(maxNumberSpotsResults)
      ))
      .then(
        (docs) => {
          Promise.all(
            requests.map((item) =>
              model.countDocuments(item.filter, (err, spotsAmount) => {
              }))).then((amount) => {
                res.status(200).send({ spots: [...docs[0], ...docs[1]], spotsAmount: amount[0] + amount[1] })
              })

        })
  }
  else if (bounds && (bounds?.swLng <= bounds?.neLng)) {
    model.find(
      getFilters({ countries, fields, bounds: [[bounds.swLng, bounds.swLat], [bounds.neLng, bounds.neLat]] }),
      function (err, docs) {
        const docsWithLocations = docs?.filter(
          (spot) => spot?.location?.lat && spot?.location?.lng
        )
        model.countDocuments(getFilters({ countries, fields, bounds: [[bounds.swLng, bounds.swLat], [bounds.neLng, bounds.neLat]] }), (err, spotsAmount) =>
          res.status(200).send({ spots: docsWithLocations, spotsAmount })
        );
      }).sort({ $natural: -1 })
      .skip(maxNumberSpotsResults * (page - 1))
      .limit(maxNumberSpotsResults);
  }
}




module.exports = {
  getOrganizations,
  getBusinesses,
  findSpots
};
