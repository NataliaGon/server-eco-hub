const { NewsModel } = require("../models/news");

module.exports = function (req, res) {
  const { key } = req.query;
  NewsModel.find({ key: key }, function (err, docs) {
    return res.status(200).send({ news: docs });
  });
};
