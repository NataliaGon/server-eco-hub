const { NewsModel } = require("../models/news.js");
const { maxNumbeNewsResults } = require("../utils/constants");

module.exports = function (req, res) {
  const getData = (filters, res) => {
    return NewsModel.find(filters, function (err, docs) {
      NewsModel.countDocuments(filters, (err, newsAmount) =>
        res.status(200).send({ news: docs, newsAmount })
      );
    })

      .sort({ $natural: -1 })
      .skip(maxNumbeNewsResults * (page - 1))
      .limit(maxNumbeNewsResults);
  };

  const { country, field, page } = req?.query;

  if ((!country || country === "all") && field) {
    getData(
      {
        field: field,
      },
      res
    );
  }
  if ((!field || field === "all") && country) {
    getData(
      {
        country: country,
      },
      res
    );
  }
  if ((!country || country === "all") && (!field || field === "all")) {
    getData({}, res);
  }
  if (country && country !== "all" && field && field !== "all") {

    getData(
      {
        field: field,
        country: country,
      },
      res
    );
  }
};

