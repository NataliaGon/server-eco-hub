const fs = require("fs");
module.exports = function (req, res) {
  let data = JSON.parse(req.body);
  fs.writeFileSync("countries.js", data);
  return res.status(200);
};
