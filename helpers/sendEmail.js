// ----- відправка через посередника -----
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "petrenko.d.g.87@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;

// // ----- поштовий сервер замовника ----
// const nodemail = require("nodemail");
// require("dotenv").config();
// const { META_PASSWORD } = process.env;
// const nodemailConfig = {
//   host: "smtp.meta.ua",
//   port: 465, // 25, 2525 - not protect
//   secure: true,
//   auth: {
//     user: "dmytro_petrenko@meta.ua",
//     pass: META_PASSWORD,
//   },
// };
// const email = {
//   to: "petrenko_dmytro@ukr.net",
//   from: "dmytro_petrenko@meta.ua",
//   subject: "Test",
//   html: "<p>Test tag</p>",
//   // ELS - шаблонізатор для листів
// };
// const transport = nodemail.createTransport(nodemailConfig);
// transport
//   .sendMail(email)
//   .then(() => console.log("Sent email success"))
//   .catch((error) => console.log(error.message));
