const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');
env = require('dotenv').config();
const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: process.env.SMTP_USERNAME,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
