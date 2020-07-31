const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.DFC_MAIL_HOST,
  port: process.env.DFC_MAIL_PORT,
  auth: {
    user: process.env.DFC_MAIL_USER,
    pass: process.env.DFC_MAIL_PASS,
  },
});

exports.transport = transport;
