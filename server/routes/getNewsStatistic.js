const { groupBy } = require("lodash");
const { NewsModel } = require("../models/news.js");

const groupResults = (docs, res, statisticField) => {
  const result = groupBy(docs, (el) => el[statisticField]);
  delete result.undefined;
  const resultStatistic = {};
  for (const item in result) {
    resultStatistic[item] = result[item].length;
  }
  return res.status(200).send(resultStatistic);
};

module.exports = function (req, res) {
  const { statisticField, country, field } = req.query;

  if (!country && field && statisticField === "country") {
    NewsModel.find({ field: field }, function (err, docs) {
      groupResults(docs, res, statisticField);
    });
  }
  if (!country && field && statisticField !== "country") {
    NewsModel.find({}, function (err, docs) {
      groupResults(docs, res, statisticField);
    });
  }
  if (!field && country && statisticField === "field") {
    NewsModel.find({ country: country }, function (err, docs) {
      groupResults(docs, res, statisticField);
    });
  }
  if (!field && country && statisticField !== "field") {
    NewsModel.find({}, function (err, docs) {
      groupResults(docs, res, statisticField);
    });
  }

  if (!country && !field) {
    NewsModel.find({}, function (err, docs) {
      groupResults(docs, res, statisticField);
    });
  }
  if (country && field) {
    NewsModel.find({ country: country, field: field }, function (err, docs) {
      groupResults(docs, res, statisticField);
    });
  }
};
