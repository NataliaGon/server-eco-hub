const { SubscriberModel } = require("../models/subscriber");
const { sendEmail } = require("../utils/mailer");

module.exports = (req, res) => {
  const item = new SubscriberModel({ email: req.body.value });
  item.save(req.body).then((a) => {
    if (a._id) {
      sendEmail(req.body.value, req.body.language, "subscribe");
      return res.status(200).send("You successfully subscribed");
    }
    if (!a._id) return res.status(500).send("You wasn't subscribed");
  });
};
