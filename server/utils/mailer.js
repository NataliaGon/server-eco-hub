const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { NEXT_PUBLIC_SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(NEXT_PUBLIC_SENDGRID_API_KEY);
const mailBody = {
  subscribe: {
    en: process.env.NEXT_PUBLIC_MAIL_SUBSCRIBE_EN,
    ru: process.env.NEXT_PUBLIC_MAIL_SUBSCRIBE_RU,
  },
  add: {
    en: process.env.NEXT_PUBLIC_MAIL_ADD_EN,
    ru: process.env.NEXT_PUBLIC_MAIL_ADD_RU,
  },
};

const unsubscribeGroup = {
  subscribe: parseInt(process.env.NEXT_PUBLIC_MAIL_UNSUBSCRIBE_GROUP),
  add: parseInt(process.env.NEXT_PUBLIC_MAIL_ADD_GROUP),
};

const mailSubject = {
  subscribe: { en: "Eco news", ru: "Эко новости" },
  add: { en: "You added an organization", ru: "Вы добавили организацию" },
};

const sendEmail = async (to, language, reason) => {
  const config = {
    from: "info@ecohubmap.com",
    to: to,
    templateId: mailBody[reason][language],
    subject: mailSubject[reason][language],
    asm: { group_id: unsubscribeGroup[reason] },
  };

  try {
    return sgMail.send(config);
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  sendEmail,
};
