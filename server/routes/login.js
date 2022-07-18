const user = {
  name: "ecoman",
  password: "organic!",
};
module.exports = function (req, res) {
  if (user.name === req.body.name && user.password === req.body.password) {
    return res.status(200).send("You successfully logged in");
  }
  return res.status(401).send("User name or/and password are wrong");
};
